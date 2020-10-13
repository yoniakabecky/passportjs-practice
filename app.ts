import express from "express";
import mongoose from "mongoose";

import keys from "./config/keys";
import { router } from "./routes/auth-routers";

const passportSetup = require("./config/passport-setup");
const app = express();

// set up view engine
app.set("view engine", "ejs");

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

// set up routes
app.use("/auth", router);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000 🚀");
});
