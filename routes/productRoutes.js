import express from "express";
import { getProducts } from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.get('/products', getProducts);

export default productRoute;