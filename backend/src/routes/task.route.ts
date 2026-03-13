import { Router } from "express";
import { storeTaskIntoDb } from "../controller/task.controller";

const taskRoute = Router();

taskRoute.post("/store", storeTaskIntoDb);

export default taskRoute;

