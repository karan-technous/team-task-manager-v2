import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import userRoute from "./routes/user.route";
import projectRoute from "./routes/project.route";
import taskRoute from "./routes/task.route";
import dashboardRoute from "./routes/dashboard.route";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:4200/",
      "http://localhost:4000",
      "http://localhost:4000/",
    ],
  }),
);
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use(errorHandler);

export default app;
