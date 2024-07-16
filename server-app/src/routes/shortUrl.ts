import express from 'express';
import { createUrl, deleteUrl, getAllUrl, getUrl } from '../controllers/shortUrl'; // Import all functions
import { getUserUrls } from '../controllers/user';

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl); //for admin
router.get("/user/:userId/shortUrls", getUserUrls); 
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);

export default router;
