import { Router } from "express";
import usersRouter from "./user.routes.js";
import urlsRouter from "./urls.routes.js";

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);

export default router;