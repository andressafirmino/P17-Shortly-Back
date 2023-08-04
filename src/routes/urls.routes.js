import { Router } from "express";
import { getUrlId, postUrls } from "../controllers/urls.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postUrls);
urlsRouter.get("/urls/:id", getUrlId);

export default urlsRouter;
