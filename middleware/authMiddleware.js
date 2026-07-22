import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

    try {
        // get the authorizatio bearer token 
        const authHeader = req.headers.authorization;

        // check if token exists or token contains bearer or not
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                success: false,
                message: "Token is missing or invalid"
            })
        }

        // get the token bu removing the bearer from it
        const token = authHeader.split(" ")[1];
        // created a decoded variable to store the verified token in it
        let decoded;

        try {
            // using jwt.verify to verify the token
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.message === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "Token is expired"
                });
            }
        }

        // find the user with the userId which was got from the token 
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // set the user in the req
        req.user = user;
        req.id = user.id
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export default authMiddleware;