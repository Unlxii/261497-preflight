import express from "express";
import { urlModel } from "../models/shortUrl";
import UserModel from "../models/user"; // Import User model

export const getUserUrls = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId).populate('urls');

        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.status(200).json(user.urls);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
}
