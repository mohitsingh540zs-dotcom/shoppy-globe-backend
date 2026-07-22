import Product from "../models/Product.js"
import mongoose from "mongoose";

// product getter
export const getProducts = async (_, res) => {
    try {
        // find the products
        const products = await Product.find();

        // sends this response back after success
        return res.status(200).json({
            success: true,
            message: "Products are fetched successfully",
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// product getter by id
export const getProductByID = async (req, res) => {
    try {
        // destructure the id from params
        const { id } = req.params;

        // check if the id is valid object or not?
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        // find the product by id 
        const product = await Product.findById(id);

        // only if product not found 
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with id ${id} not found`
            });
        }

        // after product found sends this status
        return res.status(200).json({
            success: true,
            message: `Product with id ${id} fetched successfully`,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

// product creater
export const createProduct = async (req, res) => {

    // destructure the values from req.body
    const { productName, description, price, stockQuantity } = req.body;

    try {

        // check if product is already exists or not
        const existingProduct = await Product.findOne({ productName });

        if (existingProduct) {
            existingProduct.stockQuantity += stockQuantity;

            await existingProduct.save();

            return res.status(200).json({
                success: true,
                message: "Stock updated"
            });
        }

        // if product is not exists then create one 
        const product = await Product.create({
            productName,
            description,
            price,
            stockQuantity
        });

        // sends this response after success
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}