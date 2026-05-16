const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
let MongoStore = require("connect-mongo");
MongoStore = MongoStore.default || MongoStore; //  FIX
const authRoutes = require("./routes/auth");
const googleAuthRoutes = require("./routes/googleAuth");
const stripeRoutes = require("./routes/stripe");

const passport = require("passport");
require("./middleware/googlePassport"); // 


const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//  middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    process.env.BASE_URL,
    process.env.APP_BASE_URL,
    "https://9jobs.co"
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// optional (server behind proxy)
app.set("trust proxy", 1);

//  session
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 30 * 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // https production me true karna
      maxAge: 15 * 24 * 60 * 60 * 1000,
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());





//  DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => {
    console.error("❌ Database NOT connected");
    console.error("Reason:", err.message);
  });

//  routes
app.use("/", authRoutes);
app.get("/", (req, res) => {
  return res.render("partials/index", { user: req.user || null });
});

app.use("/", googleAuthRoutes);
app.use("/", stripeRoutes);


//  public pages (agar chahiye toh)
app.get("/terms-policy", (req, res) => res.render("partials/termspolicy"));

/*app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
*/



if (process.env.VERCEL !== "1") {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend running on port ${PORT}`);
  });
}

module.exports = app;






//NODE_ENV=production
//BASE_URL=https://9jobs.co
//APP_BASE_URL=https://9jobs.co
