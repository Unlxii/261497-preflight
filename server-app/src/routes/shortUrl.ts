import express from "express";
import {
  createUrl,
  deleteUrl,
  deleteUrlbyUserId,
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
router.delete("/shortUrl/:userId/:urlId", deleteUrlbyUserId);

export default router;
