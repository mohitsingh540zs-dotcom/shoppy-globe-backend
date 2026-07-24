import express from "express";
import { getAllUsers, getMe, login, register } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authvalidator } from "../middleware/validator.js";

const userRoutes = express.Router();

userRoutes.get('/all-users', getAllUsers); // example route we can later on transform this into RBAC route
userRoutes.post('/register', authvalidator, register);
userRoutes.post('/login', login);
userRoutes.get('/me', authMiddleware, getMe);

export default userRoutes