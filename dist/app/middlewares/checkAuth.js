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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../modules/user/user.model");
const rider_model_1 = require("../modules/rider/rider.model");
const driver_model_1 = require("../modules/driver/driver.model");
const user_interface_1 = require("../modules/user/user.interface");
const checkAuth = (...authRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const accessToken = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization);
        // console.log("accessToken",accessToken);
        // console.log("req?.cookies",req.cookies);
        if (!accessToken) {
            throw new AppError_1.AppError("No Token Recieved", 403);
        }
        const verifiedToken = jwt_1.jwtHelpers.verifyToken(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        // console.log("verifiedToken",verifiedToken);
        const user = yield user_model_1.User.findOne({ email: verifiedToken.email });
        // console.log(user);
        if (!user) {
            throw new AppError_1.AppError("User does not exist", 400);
        }
        console.log(verifiedToken.role);
        if (!authRole.includes(verifiedToken.role)) {
            throw new AppError_1.AppError("You are not authorized to access this route", 403);
        }
        if (user.role == user_interface_1.Role.Rider) {
            const rider = yield rider_model_1.Rider.findOne({ email: verifiedToken.email });
            if (!rider) {
                throw new AppError_1.AppError("You are not a valid rider", 403);
            }
            if (rider.isBlocked) {
                throw new AppError_1.AppError("You are blocked by admin", 403);
            }
        }
        if (user.role == user_interface_1.Role.Driver) {
            const driver = yield driver_model_1.Driver.findOne({ email: verifiedToken.email });
            if (!driver) {
                throw new AppError_1.AppError("You are not a valid rider", 403);
            }
            if (driver.isApproved == "suspend") {
                throw new AppError_1.AppError("You are suspend by admin", 403);
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
