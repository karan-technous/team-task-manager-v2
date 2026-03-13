import { Request, Response } from "express";
import {
  deleteProjectById,
  getProject,
  storeProject,
} from "../service/project.service";
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

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return sendError(res, "Invalid project id", 400);
    }

    const deleted = await deleteProjectById(id);
    if (!deleted) {
      return sendError(res, "Project not found", 404);
    }

    sendSuccess(res, deleted, "project deleted successfully");
  } catch (err) {
    sendError(res, "error to deleting project", 500, err);
  }
};
