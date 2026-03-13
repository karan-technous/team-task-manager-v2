import { Router } from "express";
import { deleteTask, storeTaskIntoDb } from "../controller/task.controller";

const taskRoute = Router();

taskRoute.post("/store", storeTaskIntoDb);
taskRoute.delete("/:id", deleteTask);

export default taskRoute;
