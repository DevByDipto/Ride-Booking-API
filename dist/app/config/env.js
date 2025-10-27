"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // keno dilam ?
const loadEnvVariable = () => {
    const requredEnvVariables = ["PORT", 'MONGO_URI', "NODE_ENV", "SESSION_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "SALT", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESH_EXPIRES", "CLIENT_URL",
        // "CLIENT_DOMAIN"
    ];
    requredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require enviroment variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        NODE_ENV: process.env.NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SALT: process.env.SALT,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        CLIENT_URL: process.env.CLIENT_URL,
        // CLIENT_DOMAIN: process.env.CLIENT_DOMAIN as string,
    };
};
exports.envVars = loadEnvVariable();
