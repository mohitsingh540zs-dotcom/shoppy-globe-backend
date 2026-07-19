import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/Db.js";

const PORT = process.env.PORT || 5100;

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.end("API is running...");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
