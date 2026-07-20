import express from "express";
import { createProduct, getProductByID, getProducts } from "../controllers/productController.js";
import validator from "../middleware/validator.js";

const productRoute = express.Router();

productRoute.get('/products', getProducts);
productRoute.get('/products/:id', getProductByID);

productRoute.post('/add', validator, createProduct);

export default productRoute;