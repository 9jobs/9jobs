const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const User = require("../model/user"); // ✅ aapka existing model path

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const username = profile.displayName || "Google User";

        if (!email) return done(null, false);

        // ✅ user email se find
        let user = await User.findOne({ email });

        // ✅ model me passwordHash required hai, isliye Google user ke liye random passwordHash set karenge
        if (!user) {
          const randomPass = crypto.randomBytes(24).toString("hex");
          const passwordHash = await bcrypt.hash(randomPass, 10);

          user = await User.create({
            username,
            email,
            passwordHash, // ✅ required field satisfied
          });
        } else {
          // optional: username update
          if (!user.username || user.username === "Google User") {
            user.username = username;
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ session store me user id save
passport.serializeUser((user, done) => done(null, user._id.toString()));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

module.exports = passport;
