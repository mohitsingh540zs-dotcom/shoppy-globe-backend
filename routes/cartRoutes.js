import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { addToCart, deleteCartItem, getCart, updateCart } from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.get('/', authMiddleware, getCart);
cartRoute.post('/add', authMiddleware, addToCart);
cartRoute.put('/:productId', authMiddleware, updateCart);
cartRoute.delete('/delete/:productId', authMiddleware, deleteCartItem);


export default cartRoute;
