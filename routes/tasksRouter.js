import express from "express";
import { addTask, getTasks } from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", addTask);
taskRouter.get("/", getTasks);

export default taskRouter;