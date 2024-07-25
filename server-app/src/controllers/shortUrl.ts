import express from "express";
import { urlModel } from "../models/shortUrl";
import { Types } from "mongoose";
import UserModel from "../models/user";
import { Request, Response } from "express";

export const createUrl = async (req: Request, res: Response) => {
  try {
    const { fullUrl, userId } = req.body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId provided" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urlFound = await urlModel.findOne({ fullUrl });
    if (urlFound) {
      if (user.urls.includes(urlFound._id)) {
        return res
          .status(409)
          .json({ message: "This URL is already associated with this user" });
      }

      user.urls.push(urlFound._id);
      await user.save();
      return res.status(200).json(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl, user: userId });
      user.urls.push(shortUrl._id);
      await user.save();
      return res.status(201).json(shortUrl);
    }
  } catch (error: unknown) {
    console.error("Error creating URL:", error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
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
export const getUserUrls = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId).populate('urls');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.urls); // Send user's URLs as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
