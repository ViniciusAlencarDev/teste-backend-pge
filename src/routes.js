"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const jwt_1 = __importDefault(require("./modules/jwt"));
const verifyAdministrator_1 = __importDefault(require("./modules/verifyAdministrator"));
// import controllers
const UserController_1 = __importDefault(require("./controllers/UserController"));
router.post('/user/create', UserController_1.default.create);
router.post('/user/login', UserController_1.default.login);
router.post('/user/list', jwt_1.default.verifyToken, verifyAdministrator_1.default, UserController_1.default.list);
router.post('/user/update', jwt_1.default.verifyToken, UserController_1.default.update);
router.post('/user/delete', jwt_1.default.verifyToken, UserController_1.default.delete);
exports.default = router;
