import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import { signIn, signUp } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.delete("/home");
usersRouter.get("/");

export default usersRouter;