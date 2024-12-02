import { Request, Response, NextFunction } from "express";

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user?.adminPerms) {
    return next(); 
  }
  res.status(403).send("Forbidden: You do not have access to this page");
};
