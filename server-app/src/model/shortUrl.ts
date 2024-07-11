import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid().substring(0, 10),
    },
    click: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + 7);
        return date;
      },
      immutable: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
