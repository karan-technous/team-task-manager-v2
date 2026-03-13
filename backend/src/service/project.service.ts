import { AppDataSource } from "../config/database";
import { Project } from "../entities/Project";
import { deleteTasksByProjectName } from "./task.service";

const projectRepo = AppDataSource.getRepository(Project);
export const getProject = async () => {
  return await projectRepo.find();
};

export const storeProject = async (data: Project) => {
  return await projectRepo.save(data);
};

export const deleteProjectById = async (id: number) => {
  const project = await projectRepo.findOneBy({ id });
  if (!project) {
    return null;
  }

  const deletedTasksCount = await deleteTasksByProjectName(project.projectName);
  await projectRepo.remove(project);

  return { project, deletedTasksCount };
};
