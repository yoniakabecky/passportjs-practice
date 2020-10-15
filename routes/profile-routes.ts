import express, { NextFunction, Request, Response } from "express";

import { User } from "../types/user";

interface RequestWithUser extends Request {
  user?: User;
}

export const router = express.Router();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req: RequestWithUser, res: Response) => {
  res.render("profile", { user: req.user });
});
