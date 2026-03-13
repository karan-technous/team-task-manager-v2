export type Task = {
  id: number;
  projectName: string;
  summary: string;
  description: string;
  issueType: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskRequest = {
  projectName: string;
  summary: string;
  description: string;
  issueType: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
};

