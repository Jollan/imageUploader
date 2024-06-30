"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const error_controller_1 = __importDefault(require("./controllers/error.controller"));
const customError_1 = __importDefault(require("./utils/customError"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static("./uploads"));
app.use("/service/v1/upload", image_routes_1.default);
app.all("*", (req, res, next) => {
    const error = new customError_1.default(`Can't find <${req.method} ${req.originalUrl}> on the server!`, 404);
    next(error);
});
app.use(error_controller_1.default);
module.exports = app;
