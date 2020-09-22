import express, { Request, Response } from "express";

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
router.get("/google", (req: Request, res: Response) => {
  // handle with passport
  res.send("logging in with Google");
});
