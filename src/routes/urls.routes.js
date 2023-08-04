import { Router } from "express";
import { getUrlId, getUrlOpen, postUrls } from "../controllers/urls.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postUrls);
urlsRouter.get("/urls/:id", getUrlId);
urlsRouter.get("/urls/open/:shortUrl", getUrlOpen);

export default urlsRouter;
