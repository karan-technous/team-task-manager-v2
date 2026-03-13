import { Router } from "express";
import { getOverview } from "../controller/dashboard.controller";

const dashboardRoute = Router();

dashboardRoute.get("/overview", getOverview);

export default dashboardRoute;

