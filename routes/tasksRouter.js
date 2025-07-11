import express from "express";
import { addTask } from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", addTask);

export default taskRouter;