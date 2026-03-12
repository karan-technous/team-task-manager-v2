import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200,
) => {
  return res.status(status).json({
    success: true,
    time: new Date().toISOString(),
    message,
    data,
    error: null,
  });
};

export const sendError = (
  res: Response,
  message = "Something went wrong",
  status = 500,
  error: unknown = null,
) => {
  let errorData: any = null;

  if (error instanceof Error) {
    errorData = {
      message: error.message,
      stack: error.stack,
    };
  } else {
    errorData = error;
  }

  return res.status(status).json({
    success: false,
    time: new Date().toISOString(),
    message,
    data: null,
    error: errorData,
  });
};
