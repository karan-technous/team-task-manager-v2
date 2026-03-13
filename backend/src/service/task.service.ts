import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";

const taskRepo = AppDataSource.getRepository(Task);

export const getTasks = async () => {
  return await taskRepo.find({ order: { createdAt: "DESC" } });
};

export const storeTask = async (data: Task) => {
  return await taskRepo.save(data);
};

export const deleteTaskById = async (id: number) => {
  const task = await taskRepo.findOneBy({ id });
  if (!task) {
    return null;
  }

  await taskRepo.remove(task);
  return task;
};

export const deleteTasksByProjectName = async (projectName: string) => {
  const result = await taskRepo.delete({ projectName });
  return result.affected ?? 0;
};
