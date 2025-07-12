import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", addTask);
taskRouter.get("/", getTasks);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;