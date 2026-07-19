import Product from "../models/Product.js"

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
            message: "Internal Server Error" || error.message
        });
    }
}