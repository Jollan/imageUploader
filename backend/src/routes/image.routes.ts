import e from "express";
import * as imageController from "../controllers/image.controller";

const imageRouter = e.Router();

imageRouter.post("/image", imageController.upload, imageController.createImage);
imageRouter.get("/image/:id", imageController.getImage);

export = imageRouter;
