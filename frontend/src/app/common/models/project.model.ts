export type Project = {
  id: number;
  projectName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectRequest = {
  projectName: string;
  description: string;
};
