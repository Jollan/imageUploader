import express from "express";
import globalErrorHandler from "./controllers/error.controller";
import CustomError from "./utils/customError";
import imageRouter from "./routes/image.routes";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("./uploads"));
app.use("/service/v1/upload", imageRouter);
app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find <${req.method} ${req.originalUrl}> on the server!`,
    404
  );
  next(error);
});
app.use(globalErrorHandler);

export = app;
