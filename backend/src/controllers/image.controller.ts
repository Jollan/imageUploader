import asyncErrorHandler from "../utils/asyncErrorHandler";
import Image from "../models/image.model";
import CustomError from "../utils/customError";
import multer from "multer";
import path from "path";
import util from "util";

const storage = multer.diskStorage({
  destination: "uploads/images",
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerConfig = multer({
  storage,
  limits: { fileSize: 2_097_152 },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const allowedTypes = [".jpeg", ".jpg", ".png", ".gif"];
    if (!allowedTypes.includes(ext)) {
      cb(new CustomError("The file type must be .jpg or .gif or .png.", 400));
      return;
    }
    cb(null, true);
  },
});

export const upload = asyncErrorHandler(
  util.promisify(multerConfig.single("image"))
);

export const createImage = asyncErrorHandler(async (req, res) => {
  const image = await Image.create(req.file);
  image.path = undefined!;
  res.status(201).json({
    status: "success",
    data: { image },
  });
});

export const getImage = asyncErrorHandler(async (req, res) => {
  const image = await Image.findById(req.params.id).select("+path");
  if (!image) {
    throw new CustomError("The file you try to get is not found.", 404);
  }
  res.sendFile(path.resolve(image.path));
});
