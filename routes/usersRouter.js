import express from "express";
import { loginUser, registerUser } from "../controllers/usersController.js";


const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/", loginUser)

export default usersRouter;