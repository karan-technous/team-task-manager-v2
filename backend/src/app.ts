import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import userRoute from "./routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use(errorHandler);

export default app;
