import express from "express";
import { getAllUsers, getMe, login, register } from "../controllers/userController.js";
import validator from "../middleware/validator.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get('/all-users', getAllUsers);
userRoutes.post('/register', validator, register);
userRoutes.post('/login', login);
userRoutes.get('/me', authMiddleware, getMe);

export default userRoutes