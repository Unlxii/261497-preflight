"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and setup (unchanged)
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
(0, dbConfig_1.default)();
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// Updated CORS configuration to allow localhost:3000 AND localhost:3001
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5000",
        "http://localhost:5001",
        "http://localhost:27017",
    ],
    credentials: true,
}));
// Routes
app.use("/api", shortUrl_1.default);
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the URL Shortener API");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
