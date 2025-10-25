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
exports.takeRefreshTokenAndGenerateNewAccessToken = exports.createUserToken = void 0;
const env_1 = require("../config/env");
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("./jwt");
const AppError_1 = require("./AppError");
const rider_model_1 = require("../modules/rider/rider.model");
const driver_model_1 = require("../modules/driver/driver.model");
// interface TokenPayload{
//     _id:string,
//     role:string
// }
// Partial<IUser>
const createUserToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    const accessToken = jwt_1.jwtHelpers.createToken(payload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = jwt_1.jwtHelpers.createToken(payload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserToken = createUserToken;
const takeRefreshTokenAndGenerateNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = jwt_1.jwtHelpers.verifyToken(refreshToken, env_1.envVars.JWT_REFRESH_SECRET);
    // console.log(verifiedRefreshToken);
    const isUserExist = yield user_model_1.User.findOne({ email: verifiedRefreshToken.email });
    if (!isUserExist) {
        throw new AppError_1.AppError("User does not exist", 400);
    }
    if (verifiedRefreshToken.role == user_interface_1.Role.Rider) {
        const rider = yield rider_model_1.Rider.findOne({ email: verifiedRefreshToken.email });
        if (!rider) {
            throw new AppError_1.AppError("You are not a valid rider", 403);
        }
        if (rider.isBlocked) {
            throw new AppError_1.AppError("You are blocked by admin", 403);
        }
    }
    if (verifiedRefreshToken.role == user_interface_1.Role.Driver) {
        const driver = yield driver_model_1.Driver.findOne({ email: verifiedRefreshToken.email });
        if (!driver) {
            throw new AppError_1.AppError("You are not a valid rider", 403);
        }
        if (driver.isApproved == "suspend") {
            throw new AppError_1.AppError("You are suspend by admin", 403);
        }
    }
    const payload = { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role };
    const newAccessToken = jwt_1.jwtHelpers.createToken(payload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    return newAccessToken;
});
exports.takeRefreshTokenAndGenerateNewAccessToken = takeRefreshTokenAndGenerateNewAccessToken;
