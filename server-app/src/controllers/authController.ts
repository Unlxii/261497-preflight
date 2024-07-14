const User = require("../model/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
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
    const user = await User.create({ name, email, password: hashedPassword });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
