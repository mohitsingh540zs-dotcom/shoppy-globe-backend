import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


export const register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
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

        const safeuser = user.toObject();
        delete safeuser.password;

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

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // basic validation

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);
        const safeUser = user.toObject();
        delete safeUser.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.firstName}`,
            user: safeUser,
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

