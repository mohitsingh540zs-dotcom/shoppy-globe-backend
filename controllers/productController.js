import Product from "../models/Product.js"
import mongoose from "mongoose";

export const getProducts = async (_, res) => {
    try {
        const products = await Product.find();


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

export const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with id ${id} not found`
            });
        }

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

    const { productName, description, price, stockQuantity } = req.body;

    try {

        const existingProduct = await Product.findOne({ productName });

        if (existingProduct) {
            existingProduct.stockQuantity += stockQuantity;

            await existingProduct.save();

            return res.status(200).json({
                success: true,
                message: "Stock updated"
            });
        }


        const product = await Product.create({
            productName,
            description,
            price,
            stockQuantity
        });

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