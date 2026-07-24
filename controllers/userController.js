import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register controller 
export const register = async (req, res) => {

    // destructure the values from req.body
    const { firstName, lastName, email, password } = req.body;

    try {

        // find the user by email
        const user = await User.findOne({ email });

        // user is already exists then send back this response
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists, please login."
            });
        }

        // hash the password using bcrypt and salt round.
        const hashPassword = await bcrypt.hash(password, 10);

        // crete a newUser object 
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        // creates a safeUser object using user Object
        const safeUser = newUser.toObject();
        // delete the password property from it and send back as user response
        delete safeUser.password;

        // sends back this response after success
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            safeUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// login controller
export const login = async (req, res) => {

    // destructure the values from body
    const { email, password } = req.body;

    try {

        // basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // find the user with the help of email 
        const user = await User.findOne({ email }).select("+password");

        // if user not found this will trigger
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // check is the sended password and saved password is a match or not?
        const isMatch = await bcrypt.compare(password, user.password);

        // if not match then sends this response
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // generate a jwt token for authentication purpose
        const token = generateToken(user._id);
        const safeUser = user.toObject();
        delete safeUser.password;

        // sends this response on success
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

//get all user controller
export const getAllUsers = async (_, res) => {
    try {
        // gives back all the users data 
        const users = await User.find({});

        // triggers after success
        return res.status(200).json({
            success: true,
            message: "All Users fetched",
            users: users ? users : []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

// get self controller
export const getMe = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });

}