import express, { Request, Response } from "express";
import passport from "passport";

export const router = express.Router();

// auth login
router.get("/login", (req: Request, res: Response) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req: Request, res: Response) => {
  req.logOut();
  res.redirect("/");
});

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    res.redirect("/profile/");
  }
);

// auth with facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/profile/",
    failureRedirect: "/login",
  })
);
