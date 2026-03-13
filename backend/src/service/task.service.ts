import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";

const taskRepo = AppDataSource.getRepository(Task);

export const getTasks = async () => {
  return await taskRepo.find({ order: { createdAt: "DESC" } });
};

export const storeTask = async (data: Task) => {
  return await taskRepo.save(data);
};
