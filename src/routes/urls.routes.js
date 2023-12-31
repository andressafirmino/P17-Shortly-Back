import { Router } from "express";
import { deleteUrl, getUrlId, getUrlOpen, postUrls, ranking } from "../controllers/urls.controllers.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { urlSchema } from "../schemas/urls.schemas.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), postUrls);
urlsRouter.get("/urls/:id", getUrlId);
urlsRouter.get("/urls/open/:shortUrl", getUrlOpen);
urlsRouter.delete("/urls/:id", deleteUrl);
urlsRouter.get("/ranking", ranking);

export default urlsRouter;
