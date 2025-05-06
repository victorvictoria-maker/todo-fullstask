import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const data = req.body;
  // console.log(data);

  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields"));
  }

  await connectToDB();
  const isRegistered = await User.exists({ email: data.email });
  if (isRegistered) return next(createError(400, "User already exists"));

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);
  const newUser = new User({ ...data, password: hashedPassword });
  await newUser.save();
  res.status(201).json("User created successfully!");
  // res.send(newUser);
}

export async function login(req, res, next) {
  const data = req.body;
  // console.log(data);

  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields"));
  }

  await connectToDB();
  const user = await User.findOne({ email: data.email });
  if (!user)
    return next(createError(400, "Invalid credentials - you need to sign up"));

  const correctPassword = await bcrypt.compare(data.password, user.password);
  if (!correctPassword) return next(createError(400, "Invalid password"));

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

export async function logout(req, res, next) {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json("User logged out successfully!");
}
