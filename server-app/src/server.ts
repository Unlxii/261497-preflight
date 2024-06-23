import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import  connectDB  from './config/dbConfig';
import shortUrl from './routes/shortUrl';
dotenv.config();
connectDB();

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/", shortUrl);
// app.get("/", (req, res) => {
//   res.send("Welcome to the URL Shortener API");

// });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}); 