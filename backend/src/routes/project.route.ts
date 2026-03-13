import { Router } from "express";
import {
  deleteProject,
  getAllProject,
  storeIntoDb,
} from "../controller/project.controller";

const projectRoute = Router();

projectRoute.get("/", getAllProject);
projectRoute.post("/store", storeIntoDb);
projectRoute.delete("/:id", deleteProject);

export default projectRoute;
