import express from "express";
import { createProduct, deleteProduct, getProductByID, getProducts, updateProduct } from "../controllers/productController.js";
import { productValidator } from "../middleware/validator.js";

const productRoute = express.Router();

productRoute.get('/products', getProducts);
productRoute.get('/products/:id', getProductByID);
productRoute.post('/add', productValidator, createProduct);
productRoute.put('/update/:id', productValidator, updateProduct);
productRoute.delete('/delete/:id', deleteProduct);


export default productRoute;