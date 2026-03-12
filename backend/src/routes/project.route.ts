import { Router } from "express";
import { getAllProject, storeIntoDb } from "../controller/project.controller";

const projectRoute = Router();

projectRoute.get("/", getAllProject);
projectRoute.post("/store", storeIntoDb);

export default projectRoute;
