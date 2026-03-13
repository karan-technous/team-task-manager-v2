import { Request, Response } from "express";
import { storeTask } from "../service/task.service";
import { sendError, sendSuccess } from "../utils/response";
import { Task } from "../entities/Task";

export const storeTaskIntoDb = async (req: Request, res: Response) => {
  try {
    const {
      projectName,
      summary,
      description,
      issueType,
      priority,
      status,
      assignee,
      dueDate,
    } = req.body ?? {};

    if (
      !projectName ||
      !summary ||
      !description ||
      !issueType ||
      !priority ||
      !status ||
      !assignee ||
      !dueDate
    ) {
      return sendError(res, "All fields are required", 400);
    }

    const newTask = new Task();
    newTask.projectName = projectName;
    newTask.summary = summary;
    newTask.description = description;
    newTask.issueType = issueType;
    newTask.priority = priority;
    newTask.status = status;
    newTask.assignee = assignee;
    newTask.dueDate = dueDate;

    const savedTask = await storeTask(newTask);

    sendSuccess(res, savedTask, "task created", 201);
  } catch (err) {
    sendError(res, "error to creating task", 500, err);
  }
};
