import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { addToCart } from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.post('/add', authMiddleware, addToCart);

export default cartRoute;
