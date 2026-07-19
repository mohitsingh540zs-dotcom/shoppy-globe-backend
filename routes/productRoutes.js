import express from "express";
import { getProductByID, getProducts } from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.get('/products', getProducts);
productRoute.get('/products/:id', getProductByID)

export default productRoute;