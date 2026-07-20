import express from "express";
import { register } from "../controllers/userController.js";

const userRoutes = express.Router();

// userRoutes.get('/all-users', getAllUsers);
userRoutes.post('/register', register);

export default userRoutes