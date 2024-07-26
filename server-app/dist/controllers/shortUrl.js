"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserUrlsByUsername = exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../models/shortUrl");
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../models/user"));
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl, userId } = req.body;
        if (!userId || !mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId provided" });
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const urlFound = yield shortUrl_1.urlModel.findOne({ fullUrl });
        if (urlFound) {
            if (user.urls.includes(urlFound._id)) {
                return res
                    .status(409)
                    .json({ message: "This URL is already associated with this user" });
            }
            user.urls.push(urlFound._id);
            yield user.save();
            return res.status(200).json(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl, user: userId });
            user.urls.push(shortUrl._id);
            yield user.save();
            return res.status(201).json(shortUrl);
        }
    }
    catch (error) {
        console.error("Error creating URL:", error);
        res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.urlModel.find();
        if (shortUrls.length < 0) {
            res.status(400).send("shortUrl not found");
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send("Full ShortUrl not found!");
        }
        else {
            shortUrl.click++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send("Request URL deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
});
exports.deleteUrl = deleteUrl;
const getUserUrlsByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const user = yield user_1.default.findOne({ name }).populate("urls");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.urls);
    }
    catch (error) {
        console.error("Error fetching user URLs:", error);
        res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getUserUrlsByUsername = getUserUrlsByUsername;
