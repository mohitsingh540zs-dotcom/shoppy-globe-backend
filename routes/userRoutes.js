import express from "express";
import { register } from "../controllers/userController.js";
import validator from "../middleware/validator.js";

const userRoutes = express.Router();

// userRoutes.get('/all-users', getAllUsers);
userRoutes.post('/register', validator, register);

export default userRoutes