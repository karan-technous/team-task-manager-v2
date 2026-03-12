import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response";
import { getUsers, storeUserDB } from "../service/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await getUsers();
    sendSuccess(res, allUser, "data fetched succesfully");
  } catch (err) {
    sendError(res, "error in fetching user", 500, err);
  }
};

export const storeUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const dbUser = await storeUserDB(userData);
    sendSuccess(res, dbUser, "user created");
  } catch (err) {
    sendError(res, "error in creating user", 500, err);
  }
};
