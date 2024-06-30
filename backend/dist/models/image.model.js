"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    filename: {
        type: String,
        required: [true, "This is a required field."],
        trim: true,
    },
    url: {
        type: String,
        required: [true, "This is a required field."],
        trim: true,
    },
    path: {
        type: String,
        required: [true, "This is a required field."],
        trim: true,
        select: false,
    },
}, { timestamps: true });
imageSchema.pre("validate", function () {
    this.url = `${process.env.BASE_URL}/images/${this.filename}`;
});
const Image = mongoose_1.default.model("Image", imageSchema);
exports.default = Image;
