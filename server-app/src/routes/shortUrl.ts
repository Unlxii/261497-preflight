import exp from 'constants';
import { create } from 'domain';
import express from 'express';
import { createUrl } from '../controllers/shortUrl';
import { deleteUrl, getAllUrl, getUrl } from '../controllers/shortUrl';
import { getUserUrls } from '../controllers/user';

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl); // Fetch all URLs (for admin use?)
router.get("/user/:userId/shortUrls", getUserUrls); // Fetch user specific URLs
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);

export default router;