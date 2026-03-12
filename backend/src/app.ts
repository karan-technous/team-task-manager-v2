import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import userRoute from "./routes/user.route";
import projectRoute from "./routes/project.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/project",projectRoute)
app.use(errorHandler);

export default app;
