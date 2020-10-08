import express from "express";

import { router } from "./routes/auth-routers";

const passportSetup = require("./config/passport-setup");

const app = express();

// set up view engine
app.set("view engine", "ejs");

// set up routes
app.use("/auth", router);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000 🚀");
});
