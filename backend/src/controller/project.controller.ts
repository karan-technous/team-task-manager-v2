import { Request, Response } from "express";
import { getProject, storeProject } from "../service/project.service";
import { sendError, sendSuccess } from "../utils/response";

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const allProject = await getProject();
    sendSuccess(res, allProject, "Project fetched succesfully");
  } catch (err) {
    sendError(res, "error in fetching projects", 500, err);
  }
};

export const storeIntoDb = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const savedProject = await storeProject(body);
    sendSuccess(res, savedProject, "project saved successfully");
  } catch (err) {
    sendError(res, "error to saving project", 500, err);
  }
};
