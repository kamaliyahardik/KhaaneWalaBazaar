import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";


const userRouter = express.Router();


authRouter.get("/current", isAuth, getCurrentUser);

export default userRouter;
