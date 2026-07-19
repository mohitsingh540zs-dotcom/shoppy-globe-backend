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