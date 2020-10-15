import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";

import keys from "./config/keys";
import { router as authRoutes } from "./routes/auth-routes";
import { router as profileRoutes } from "./routes/profile-routes";

const passportSetup = require("./config/passport-setup");
const app = express();

// set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000 🚀");
});
