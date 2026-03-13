import { Project } from "../entities/Project";
import { Task } from "../entities/Task";
import { getProject } from "./project.service";
import { getTasks } from "./task.service";

type PanelItem = {
  id?: number;
  title: string;
  count?: number;
};

type Panel = {
  project: string;
  icon?: string;
  items: PanelItem[];
};

export type DashboardOverview = {
  projects: Project[];
  tasks: Task[];
  panels: Panel[];
};

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  const [projects, tasks] = await Promise.all([getProject(), getTasks()]);

  const tasksByProject = new Map<string, Task[]>();
  for (const task of tasks) {
    const key = task.projectName;
    const list = tasksByProject.get(key) ?? [];
    list.push(task);
    tasksByProject.set(key, list);
  }

  const panels: Panel[] = projects.map((project) => {
    const list = tasksByProject.get(project.projectName) ?? [];
    return {
      project: project.projectName,
      items: list.map((t) => ({ id: t.id, title: t.summary })),
    };
  });

  for (const [projectName, list] of tasksByProject.entries()) {
    const exists = projects.some((p) => p.projectName === projectName);
    if (exists) continue;

    panels.push({
      project: projectName,
      items: list.map((t) => ({ id: t.id, title: t.summary })),
    });
  }

  return { projects, tasks, panels };
};
