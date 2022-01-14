"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const protocol = process.env.PROTOCOL || 'http';
const ip = require('ip').address();
const port = process.env.PORT || 3030;
const routes_1 = __importDefault(require("./routes"));
app.use(routes_1.default);
app.listen(port, () => console.log(`Server started in http://localhost:${port} or ${protocol}://${ip}:${port}`));
