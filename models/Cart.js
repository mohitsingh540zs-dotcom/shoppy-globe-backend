import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        unique: true,
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true
            },

            quantity: {
                type: Number,
                min: 1,
                default: 1,
                required: true
            }
        }
    ]
},
    {
        timestamps: true,
        versionKey: false
    });

export default mongoose.model("Cart", cartSchema);
