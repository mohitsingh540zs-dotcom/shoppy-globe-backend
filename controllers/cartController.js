import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// to add the product in the cart
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

// to update the cart by id
export const updateCart = async (req, res) => {

    try {
        // get userId from req.user._id
        const userId = req.user._id;
        // destructure the productId and quantity from req.params and req.body
        const { productId } = req.params;
        const { quantity } = req.body;

        // Check for quantity and quantity length
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }

        // find cart exists or not 
        const cart = await Cart.findOne({
            user: userId
        });

        // if cart not found then this will trigger
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        // find product in cart
        const item = cart.items.find((item) => item.product.equals(productId));

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        // Update quantity
        item.quantity = quantity;

        // save changes
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// to delete the products from cart with the help of id
export const deleteCartItem = async (req, res) => {
    try {
        // get the userId from req.user._id
        const userId = req.user._id;
        // get the productId from params
        const { productId } = req.params;

        // find the cart by userId
        const cart = await Cart.findOne({ user: userId });

        // if cart not found this will trigger
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        // find the item inside cart
        const item = cart.items.find(item =>
            item.product.equals(productId)
        );

        // if item not found this will trigger
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        // Remove the item from the array
        cart.items = cart.items.filter(
            item => !item.product.equals(productId)
        );

        // save the changes
        await cart.save();

        // sending back the response after success
        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// to get the cart
export const getCart = async (req, res) => {
    try {
        // get the userId from req.user._id
        const userId = req.user._id;

        // find the cart and populate 
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        // if cart not found this will trigger
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // sends this response after success 
        return res.status(200).json({
            success: true,
            message: "Cart fetched",
            cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}