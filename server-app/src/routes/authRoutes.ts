import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
export default router;
