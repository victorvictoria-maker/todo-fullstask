import { Request, Response, NextFunction } from "express";

export interface RegisterInput {
  email: string;
  password: string;
  [key: string]: any;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    [key: string]: any;
  };
}

export type AuthHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export interface TodoInput {
  title: string;
  isCompleted?: boolean;
  userId: string;
}
