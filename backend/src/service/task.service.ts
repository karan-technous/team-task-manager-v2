import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";

const taskRepo = AppDataSource.getRepository(Task);

export const storeTask = async (data: Task) => {
  return await taskRepo.save(data);
};

