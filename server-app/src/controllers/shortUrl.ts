import express from "express";
import { urlModel } from "../models/shortUrl";
import { url } from "inspector";
import e from "express";
import { Types } from "mongoose";
import UserModel from "../models/user";
import { Request, Response } from "express";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
      const { fullUrl, userId } = req.body;
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid userId provided");
      }
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const urlfound = await urlModel.find({ fullUrl });
      if (urlfound.length > 0) {
        const existingShortUrl = urlfound[0];
  
        // Check if the existing short URL is already associated with the user
        if (user.urls.includes(existingShortUrl._id)) {
          return res.status(409).send("This short URL is already associated with this user");
        }
  
        user.urls.push(existingShortUrl._id);
        await user.save();
        return res.status(200).send(existingShortUrl);
      } else {
        const shortUrl = await urlModel.create({ fullUrl, user: userId });
        user.urls.push(shortUrl._id);
        await user.save();
        res.status(201).send(shortUrl);
      }
    } catch (error: unknown) {
      console.error("Error creating URL:", error);
  
      if (error instanceof Error) {
        res.status(500).send({ message: "Something went wrong!", error: error.message });
      } else {
        res.status(500).send({ message: "An unknown error occurred" });
      }
    }
  };

    export const getAllUrl = async (
    req: express.Request,
    res: express.Response
    ) => {
    try {
        const shortUrls = await urlModel.find();
        if (shortUrls.length < 0) {
        res.status(400).send("shortUrl not found");
        } else {
        res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
    };


    export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
        res.status(404).send("Full ShortUrl not found!");
        } else {
        shortUrl.click++;
        shortUrl.save();
        res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
    };
    export const deleteUrl = async (
    req: express.Request,
    res: express.Response
    ) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
        res.status(200).send("Request URL deleted successfully");
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
    
    };
    export const getShortUrlsByUserId = async (req: Request, res: Response) => {
      try {
        const { userId } = req.params;
        const shortUrls = await urlModel.find({ user: userId });
    
        if (shortUrls.length === 0) {
          return res.status(404).json({ message: "No short URLs found for this user" });
        }
    
        res.json(shortUrls);
      } catch (error) {
        console.error("Error fetching short URLs:", error);
        res.status(500).json({ message: "Server error" });
      }
    };
    
