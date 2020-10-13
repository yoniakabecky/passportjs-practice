import express, { Request, Response } from "express";
import passport from "passport";

export const router = express.Router();

// auth login
router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

// auth logout
router.get("/logout", (req: Request, res: Response) => {
  // handle with passport
  res.send("logging out");
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
    res.send("you reached the call back URI");
  }
);
