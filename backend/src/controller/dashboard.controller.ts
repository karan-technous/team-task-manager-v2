import { Request, Response } from "express";
import { getDashboardOverview } from "../service/dashboard.service";
import { sendError, sendSuccess } from "../utils/response";

export const getOverview = async (req: Request, res: Response) => {
  try {
    const overview = await getDashboardOverview();
    sendSuccess(res, overview, "dashboard data fetched successfully");
  } catch (err) {
    sendError(res, "error in fetching dashboard data", 500, err);
  }
};

