const User = require("../model/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
import { error } from "console";
import { defaultMaxListeners } from "events";
import { Request, Response } from "express";

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
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
