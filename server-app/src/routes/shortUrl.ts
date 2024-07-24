import express from 'express';
import { createUrl, deleteUrl, getAllUrl, getShortUrlsByUserId, getUrl } from '../controllers/shortUrl'; // Import all functions
import { getUserUrls } from '../controllers/user';

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl); // Fetch all short URLs (admin)
router.get("/public/user/:userId/shortUrls", getShortUrlsByUserId);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);


export default router;
