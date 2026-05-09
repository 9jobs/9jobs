

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { sendWelcomeEmail, sendPasswordResetEmail, BASE_URL } = require("../Sendmail/mailer");
const crypto = require("crypto");

const { requireAuth, redirectIfAuth } = require("../middleware/auth");

const rateLimit = require("express-rate-limit");
const ContactMessage = require("../model/contactfrom");

const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");

const router = express.Router();

// ====== ENV REQUIRED ======
// SENDGRID_API_KEY
// MAIL_FROM            (verified sender email in SendGrid)
// ADMIN_EMAIL          (where you want to receive contact emails)
//
// TWILIO_ACCOUNT_SID
// TWILIO_AUTH_TOKEN
// TWILIO_FROM_PHONE    (Twilio phone number, e.g. +614xxxxxxxx)
// ADMIN_PHONE          (your phone, e.g. +61422552002)

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// twilio setup
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const clean = (v = "") => String(v).trim();

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ================== CONTACT PAGE ================== */
/* ✅ IMPORTANT: Only ONE /contact GET route */
router.get("/contact", (req, res) => {
  return res.render("partials/contact", { error: null, success: null });
});

// Contact form submit
router.post("/contact", contactLimiter, async (req, res) => {
  try {
    const firstName = clean(req.body.firstName);
    const lastName = clean(req.body.lastName);
    const phone = clean(req.body.phone);
    const email = clean(req.body.email).toLowerCase();
    const message = clean(req.body.message);

    if (!firstName || !phone || !email || !message) {
      return res.status(400).render("partials/contact", {
        error: "All fields are required.",
        success: null,
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).render("partials/contact", {
        error: "Please enter a valid email address.",
        success: null,
      });
    }

    // save to db
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress;

    const doc = await ContactMessage.create({
      firstName,
      lastName,
      phone,
      email,
      message,
      ip,
      userAgent: req.headers["user-agent"],
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const mailFrom = process.env.MAIL_FROM;
    const adminPhone = process.env.ADMIN_PHONE; // ✅ FIX (was process.ADMIN_PHONE)
    const twilioFrom = process.env.TWILIO_FROM_PHONE;

    // SEND EMAIL
    const canSendEmail = process.env.SENDGRID_API_KEY && adminEmail && mailFrom;

    if (canSendEmail) {
      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${firstName} ${lastName || ""}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b><br/>${escapeXml(message).replace(/\n/g, "<br/>")}</p>
          <hr/>
          <p style="color:#6b7280;font-size:12px">
            Message ID: ${doc._id}<br/>
            Created: ${new Date(doc.createdAt).toLocaleString()}
          </p>
        </div>
      `;

      await sgMail.send({
        to: adminEmail,
        from: mailFrom,
        subject: `New Message from ${firstName} (${phone})`,
        html,
        replyTo: email,
      });
    }

    // SEND SMS
    const canSendSms = twilioClient && adminPhone && twilioFrom;
    if (canSendSms) {
      const smsText =
        `New Contact Message\n` +
        `Name: ${firstName} ${lastName || ""}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Msg: ${message.slice(0, 600)}${message.length > 600 ? "..." : ""}`;

      await twilioClient.messages.create({
        body: smsText,
        from: twilioFrom,
        to: adminPhone,
      });
    }

    // CALL NOTIFICATION
    const canCall = twilioClient && adminPhone && twilioFrom;
    if (canCall) {
      const sayText = `You have a new contact message from ${firstName}. Phone number ${phone}. Please check your email for full details.`;

      await twilioClient.calls.create({
        to: adminPhone,
        from: twilioFrom,
        twiml: `<Response><Say voice="alice">${escapeXml(sayText)}</Say></Response>`,
      });
    }

    return res.render("partials/contact", {
      success: "Message sent successfully!",
      error: null,
    });
  } catch (err) {
    console.error("CONTACT ERROR:", err);

    return res.status(500).render("partials/contact", {
      error: "Something went wrong. Please try again.",
      success: null,
    });
  }
});

/* ================== PUBLIC PAGES ================== */
router.get("/about", (req, res) => res.render("partials/about"));
router.get("/service", (req, res) => res.render("partials/service"));
router.get("/offer", (req, res) => res.render("partials/offer"));
router.get("/blog", (req, res) => res.render("partials/blog"));
router.get("/faq's", (req, res) => res.render("partials/faqs"));
router.get("/privacy", (req, res) => res.render("partials/privacy"));
router.get("/terms&conditions", (req, res) => res.render("partials/termscon"));
router.get("/disclaimer", (req, res) => res.render("partials/disclaimer"));
router.get("/terms-policy", (req, res) => res.render("partials/termspolicy"));




router.get("/index", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }
  return res.render("partials/index", { user: req.user });
});




// safety redirects
router.get("/terms%20&%20policy", (req, res) => res.redirect("/terms-policy"));
router.get("/terms-policy/", (req, res) => res.redirect("/terms-policy"));

/* ================== AUTH PAGES ================== */
router.get("/register", redirectIfAuth, (req, res) => {
  res.render("partials/register", { error: null });
});

router.get("/login", redirectIfAuth, (req, res) => {
  res.render("partials/login", { error: null });
});

/* ================== PROTECTED HOME ================== */
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    if (!user) {
      req.session.destroy(() => {});
      res.clearCookie("sid");
      return res.redirect("/login");
    }
    return res.render("partials/index", { user });
  } catch (err) {
    console.error(err);
    return res.redirect("/login");
  }
});

/* ================== REGISTER POST ================== */
router.post("/register", redirectIfAuth, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).render("partials/register", { error: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).render("partials/register", { error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      passwordHash,
    });

    sendWelcomeEmail(user.email, user.username).catch(() => {});
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).render("partials/register", { error: "Something went wrong. Try again." });
  }
});

/* ================== LOGIN POST ================== */
router.post("/login", redirectIfAuth, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("partials/login", { error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).render("partials/login", { error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).render("partials/login", { error: "Invalid email or password" });
    }

    req.session.userId = user._id.toString();
    req.session.username = user.username;

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).render("partials/login", { error: "Something went wrong. Try again." });
  }
});

/* ================== LOGOUT ================== */
router.get("/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    return res.redirect("/login");
  });
});

router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    return res.redirect("/login");
  });
});

/* ================== FORGOT & RESET PASSWORD ================== */

// Forgot password page (PUBLIC)
router.get("/forgot-password", (req, res) => {
  return res.render("partials/forgot-password", { error: null, message: null });
});

// Reset password page (PUBLIC)
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { email } = req.query;

  return res.render("partials/reset-password", {
    error: null,
    token,
    email: email || "",
  });
});

// Forgot password (PUBLIC)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.render("partials/forgot-password", {
        error: "Email is required",
        message: null,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always show same message (security)
    if (!user) {
      return res.render("partials/forgot-password", {
        error: null,
        message: "If this email exists, a reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    const link = `${BASE_URL}/reset-password/${token}?email=${encodeURIComponent(user.email)}`;

    await sendPasswordResetEmail(user.email, link, user.username);

    return res.render("partials/forgot-password", {
      error: null,
      message: "If this email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error(err);
    return res.render("partials/forgot-password", {
      error: "Something went wrong. Please try again.",
      message: null,
    });
  }
});

// Reset password (PUBLIC)
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { email } = req.query;
    const { password, confirmPassword } = req.body;

    if (!email) {
      return res.render("partials/reset-password", {
        error: "Invalid reset link.",
        token,
        email: "",
      });
    }

    if (!password || !confirmPassword) {
      return res.render("partials/reset-password", {
        error: "Both password fields are required",
        token,
        email,
      });
    }

    if (password !== confirmPassword) {
      return res.render("partials/reset-password", {
        error: "Passwords do not match",
        token,
        email,
      });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res.render("partials/reset-password", {
        error: "Your reset link is invalid or expired.",
        token,
        email,
      });
    }

    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    req.session.destroy(() => {
      res.clearCookie("sid");
      return res.redirect("/login");
    });
  } catch (err) {
    console.log(err);
    return res.render("partials/reset-password", {
      error: "Something went wrong. Please try again.",
      token: req.params.token,
      email: req.query.email || "",
    });
  }
});

module.exports = router;






















