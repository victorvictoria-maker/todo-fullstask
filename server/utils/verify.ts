import jwt from "jsonwebtoken";
import { createError } from "./error";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.access_token;
  if (!token) {
    return next(createError(401, "Not Authenticated!"));
  }
  if (!process.env.JWT) {
    return next(createError(500, "JWT secret is not defined"));
  }
  jwt.verify(
    token,
    process.env.JWT,
    (
      error: jwt.VerifyErrors | null,
      user: string | jwt.JwtPayload | undefined
    ) => {
      if (error) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    }
  );
};
