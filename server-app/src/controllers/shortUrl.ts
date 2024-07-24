import express from "express";
import { urlModel } from "../models/shortUrl";
import { url } from "inspector";
import e from "express";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("The fullUrl is:", req.body.fullUrl);
    const { fullUrl } = req.body;
    const urlfound = await urlModel.find({ fullUrl });
    if (urlfound.length > 0) {
      res.status(409);
      res.send(urlfound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
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
