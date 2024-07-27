import express from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrl,
  getUrl,
  getUserUrlsByUsername,
} from "../controllers/shortUrl"; // Import all functions

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl); // Fetch all short URLs (admin)
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);
router.get("/shortUrl/:userId/urls", getUserUrlsByUsername);

export default router;
