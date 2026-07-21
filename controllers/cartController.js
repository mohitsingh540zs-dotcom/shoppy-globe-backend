import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


export const addToCart = async (req, res) => {
    try {
        // Logged in user (comes from auth middleware)
        const userId = req.user._id;

        // Data sent by client
        const { productId, quantity = 1 } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            });

            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                cart
            });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            // Increase quantity
            existingItem.quantity += quantity;
        } else {
            // Add new product
            cart.items.push({
                product: productId,
                quantity
            });
        }

        // Save updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

