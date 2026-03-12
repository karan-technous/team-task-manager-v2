import { AppDataSource } from "../config/database";
import { Project } from "../entities/Project";

const projectRepo = AppDataSource.getRepository(Project);
export const getProject = async () => {
  return await projectRepo.find();
};

export const storeProject = async (data: Project) => {
  return await projectRepo.save(data);
};
