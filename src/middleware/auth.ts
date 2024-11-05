import { Request, Response, NextFunction } from "express";

// Check authToken cookie for Login page
export const checkLoginAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authToken } = req.signedCookies;
  if (authToken === "authenticated") {
    res.redirect("/profile");
  } else {
    next();
  }
};