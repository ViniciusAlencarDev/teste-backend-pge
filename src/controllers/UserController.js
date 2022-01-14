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
const connection_1 = __importDefault(require("../database/connection"));
const jwt_1 = __importDefault(require("../modules/jwt"));
const reponseModel = {
    success: false,
    data: [],
    error: []
};
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Object.assign({}, reponseModel);
            const { username, email, password } = req.body;
            if (username && email && password) {
                try {
                    const [id, affectedRows] = yield connection_1.default.query(`
                    INSERT INTO users VALUES (
                        DEFAULT,
                        '${username}',
                        '${email}',
                        '${password}',
                        1,
                        NOW(),
                        NOW()
                    );
                `);
                    if (affectedRows > 0) {
                        response.success = true;
                        response.data = [{ token: yield jwt_1.default.createToken(id), access_level: 1 }];
                    }
                }
                catch (e) {
                    console.log(e);
                    response.error = ['Error'];
                }
            }
            return res.json(response);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                data: [],
                error: []
            };
            const { usernameOrEmail, password } = req.body;
            try {
                const [, data] = yield connection_1.default.query(`
                SELECT id, access_level FROM users WHERE
                    (username='${usernameOrEmail}' OR email='${usernameOrEmail}') AND password='${password}'
                ORDER BY id DESC LIMIT 1
            `);
                if (data.length > 0) {
                    response.success = true;
                    response.data = [{ token: yield jwt_1.default.createToken(data[0].id), access_level: data[0].access_level }];
                }
            }
            catch (e) {
                console.log(e);
                response.error = ['Error'];
            }
            return res.json(response);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                data: [],
                error: []
            };
            try {
                const [, data] = yield connection_1.default.query(`
                SELECT * FROM users
                ORDER BY id DESC
            `);
                if (data.length > 0) {
                    response.success = true;
                    response.data = data;
                }
            }
            catch (e) {
                console.log(e);
                response.error = ['Error'];
            }
            return res.json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                data: [],
                error: []
            };
            const dataReq = req;
            const id = dataReq.id;
            const { username, email, password, access_level } = req.body;
            try {
                const [data,] = yield connection_1.default.query(`
                UPDATE users SET
                    ${username && `username='${username}'`} ${username && (email || password || access_level) && ','}
                    ${email && `email='${email}'`} ${(username || email) && (password || access_level) && ','}
                    ${password && `password='${password}'`} ${(username || email || password) && access_level && ','}
                    ${access_level && `access_level='${access_level}'`}
                WHERE id=${id}
            `);
                response.success = data.affectedRows > 0;
            }
            catch (e) {
                console.log(e);
                response.error = ['Error'];
            }
            return res.json(response);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                data: [],
                error: []
            };
            const dataReq = req;
            const id = dataReq.id;
            try {
                const [, affectedRows] = yield connection_1.default.query(`
                DELETE FROM users WHERE id=${id}
            `);
                response.success = affectedRows > 0;
            }
            catch (e) {
                console.log(e);
                response.error = ['Error'];
            }
            return res.json(response);
        });
    }
}
exports.default = new UserController();
