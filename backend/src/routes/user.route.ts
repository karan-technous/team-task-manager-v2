import { Router } from "express";
import { getAllUsers, storeUser } from "../controller/user.controller";

const userRoute = Router();

userRoute.get("/", getAllUsers);
userRoute.post("/store", storeUser);

export default userRoute;
