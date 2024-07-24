const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// register endpoint
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Check name
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    // Check pwd is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }
    const hashedPassword = await hashPassword(password);
    // create user in DB
    const user = await User.create({ name, email, password: hashedPassword });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// login endpoint
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      // Set token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      // Send success response
      res.status(200).json({ message: "Login successful", user });
    }
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get profile endpoint
export const getProfile = async (req: Request, res: Response) => {
  const { token } = await req.cookies;

  if (!token) {
    return res.json(null);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(user);
  });
};
