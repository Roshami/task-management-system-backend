import express from "express";
import { deleteUser, getUsers, loginUser, registerUser, updateUser } from "../controllers/usersController.js";



const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/", loginUser)
usersRouter.get("/", getUsers)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUser)

export default usersRouter;