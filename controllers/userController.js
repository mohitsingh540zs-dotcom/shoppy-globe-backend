import User from "../models/User.js";
import bcrypt from "bcrypt";


export const register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            newUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

