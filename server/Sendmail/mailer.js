
const sgMail = require("@sendgrid/mail");

const apiKey = process.env.SENDGRID_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM; // must be verified sender in SendGrid
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const BASE_URL = process.env.BASE_URL || process.env.APP_BASE_URL || "http://localhost:3000";

if (apiKey) sgMail.setApiKey(apiKey);
else console.warn("❌ SENDGRID_API_KEY missing");

async function sendWelcomeEmail(to, username) {
  if (!apiKey || !MAIL_FROM) throw new Error("SendGrid env missing (SENDGRID_API_KEY / MAIL_FROM)");

  const msg = {
    to,
    from: MAIL_FROM,
    subject: "Welcome! Your account is created Successfully.",
    html: `<p>Hi ${username},</p><p>Login: <a href="${BASE_URL}/login">${BASE_URL}/login</a></p>`,
  };

  return sgMail.send(msg);
}

async function sendPasswordResetEmail(to, resetLink, username = "") {
  if (!apiKey || !MAIL_FROM) throw new Error("SendGrid env missing (SENDGRID_API_KEY / MAIL_FROM)");

  const msg = {
    to,
    from: MAIL_FROM,
    subject: "Reset your password",
    html: `<p>Hi ${username || "there"},</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  };

  return sgMail.send(msg);
}

// ✅ NEW: Contact form email (goes to ADMIN_EMAIL)
async function sendContactEmail({ name, email, phone, message }) {
  if (!apiKey || !MAIL_FROM || !ADMIN_EMAIL) {
    throw new Error("SendGrid env missing (SENDGRID_API_KEY / MAIL_FROM / ADMIN_EMAIL)");
  }

  const msg = {
    to: ADMIN_EMAIL,
    from: MAIL_FROM,
    subject: `New Contact Form Enquiry - ${name || "Unknown"}`,
    // replyTo ensures you can reply directly to user
    replyTo: email ? { email } : undefined,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h3>New enquiry received</h3>
        <p><b>Name:</b> ${name || "-"}</p>
        <p><b>Email:</b> ${email || "-"}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Message:</b><br/>${(message || "-").replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  };

  return sgMail.send(msg);
}

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendContactEmail,
  BASE_URL,
};
