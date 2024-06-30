"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.createImage = exports.upload = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const image_model_1 = __importDefault(require("../models/image.model"));
const customError_1 = __importDefault(require("../utils/customError"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/images");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const multerConfig = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2097152 },
    fileFilter(req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const allowedTypes = [".jpeg", ".jpg", ".png", ".gif"];
        if (!allowedTypes.includes(ext)) {
            cb(new customError_1.default("The file type must be .jpg or .gif or .png.", 400));
            return;
        }
        cb(null, true);
    },
});
exports.upload = (0, asyncErrorHandler_1.default)(util_1.default.promisify(multerConfig.single("image")));
exports.createImage = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield image_model_1.default.create(req.file);
    image.path = undefined;
    res.status(201).json({
        status: "success",
        data: { image },
    });
}));
exports.getImage = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield image_model_1.default.findById(req.params.id).select("+path");
    if (!image) {
        throw new customError_1.default("The file you try to get is not found.", 404);
    }
    res.sendFile(path_1.default.resolve(image.path));
}));
