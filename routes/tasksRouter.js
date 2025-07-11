import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", addTask);
taskRouter.get("/", getTasks);
taskRouter.put("/updatetask/:id", updateTask);
taskRouter.delete("/deletetask/:id", deleteTask);

export default taskRouter;