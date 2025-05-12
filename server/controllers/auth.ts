import { createError } from "../utils/error";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { LoginInput, RegisterInput } from "../interfaces/interface";

export async function register(
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  // console.log(data);

  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields"));
  }

  const isRegistered = await User.exists({ email: data.email });
  if (isRegistered) return next(createError(400, "User already exists"));

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);
  const newUser = new User({ ...data, password: hashedPassword });
  await newUser.save();
  res.status(201).json("User created successfully!");
  // res.send(newUser);
}

export async function login(
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  // console.log(data);

  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields"));
  }

  const user = await User.findOne({ email: data.email });
  if (!user)
    return next(createError(400, "Invalid credentials - you need to sign up"));

  const correctPassword = await bcrypt.compare(data.password, user.password);
  if (!correctPassword) return next(createError(400, "Invalid password"));

  if (!process.env.JWT) {
    return next(createError(500, "JWT secret is not defined"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT);
  // console.log(token);
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json("User logged in!");
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json("User logged out successfully!");
}

export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "No token" });
  }

  try {
    if (!process.env.JWT) {
      return next(createError(500, "JWT secret is not defined"));
    }
    const decoded = jwt.verify(token, process.env.JWT);
    if (typeof decoded !== "string" && "id" in decoded) {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ authenticated: false, message: "User not found" });
      }

      res.status(200).json({ authenticated: true, user });
    }
  } catch (err) {
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
}
