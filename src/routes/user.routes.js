import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { signInSchema, signUpSchema } from "../schemas/user.schemas";
import { signIn, signUp } from "../controllers/users.controllers";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/", validateSchema(signInSchema), signIn);
usersRouter.delete("/home", logout);
usersRouter.get("/", home);

export default usersRouter;