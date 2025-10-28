"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandelar_1 = require("./app/middlewares/globalErrorHandelar");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const express_session_1 = __importDefault(require("express-session"));
const env_1 = require("./app/config/env");
const passport_1 = __importDefault(require("passport"));
require("./app/config/passport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: 'https://lively-ganache-03dd6f.netlify.app',
    // ✅ নির্দিষ্ট করে দাও
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] // ✅ cookies/token allow করার জন্য
}));
// app.options('*', cors());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, express_session_1.default)({
    secret: env_1.envVars.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// Initialize passport
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use('/api', routes_1.router);
// app.use('/api/auth', authRouter);
exports.app.get('/', (req, res) => {
    res.send('welocome to ride booking');
});
exports.app.use(globalErrorHandelar_1.globalErrorHandler);
exports.app.use(notFound_1.default);
