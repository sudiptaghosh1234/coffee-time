import express from "express";
import { register } from "../controllers/user.controller";
import { RequestHandler } from "express";

const userRouter = express.Router();

// Explicitly assert `register` and `login` as RequestHandler
userRouter.post("/register", register as RequestHandler);
// userRouter.post("/login", login as RequestHandler);

export default userRouter;
