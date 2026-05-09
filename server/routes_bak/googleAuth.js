const express = require("express");
const passport = require("passport");

const router = express.Router();

/**
 * =========================
 * GOOGLE LOGIN START
 * =========================
 */
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * =========================
 * GOOGLE CALLBACK
 * =========================
 */
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {

    // 🔍 DEBUG LOGS
    console.log("✅ GOOGLE CALLBACK HIT");
    console.log("👉 req.user:", req.user);
    console.log("👉 req.sessionID:", req.sessionID);
    console.log("👉 req.isAuthenticated():", req.isAuthenticated());

    return res.redirect("/index");
  }
);

/**
 * =========================
 * HOME / INDEX PAGE
 * =========================
 */
router.get("/", (req, res) => {
  // login check
  if (!req.user) {
    return res.redirect("/login");
  }

  // aapki file: views/partials/index.ejs
  return res.render("partials/index", {
    user: req.user,
  });
});

/**
 * =========================
 * LOGOUT
 * =========================
 */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  });
});

module.exports = router;
