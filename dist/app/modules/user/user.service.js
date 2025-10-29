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
exports.UserService = void 0;
const env_1 = require("../../config/env");
const AppError_1 = require("../../utils/AppError");
const jwt_1 = require("../../utils/jwt");
const rider_model_1 = require("../rider/rider.model");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const driver_model_1 = require("../driver/driver.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload,"reom paylod");
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    // console.log(isUserExist);
    if (isUserExist) {
        throw new AppError_1.AppError("user already exist", 500);
    }
    const salt = bcryptjs_1.default.genSaltSync(Number(env_1.envVars.SALT));
    const haspassword = bcryptjs_1.default.hashSync(payload.password, salt);
    payload.password = haspassword;
    if (payload.role === user_interface_1.Role.Rider) {
        // create new rider
        const rider = yield rider_model_1.Rider.create(payload);
        // create new user
        const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { rider: rider._id }));
        return { user, rider };
    }
    if (payload.role === user_interface_1.Role.Driver) {
        // create new driver
        const driver = yield driver_model_1.Driver.create(payload);
        // create new user
        const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { driver: driver._id }));
        return { user, driver };
    }
});
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return new AppError_1.AppError("token not found", 401);
    }
    const verifiedToken = jwt_1.jwtHelpers.verifyToken(token, env_1.envVars.JWT_ACCESS_SECRET);
    // console.log(verifiedToken);
    const user = yield user_model_1.User.findOne({ _id: verifiedToken.id }).populate("rider").populate("driver");
    if (!user) {
        return new AppError_1.AppError("User not found or account no longer exists", 404);
    }
    // console.log("user",user);
    return user;
});
const updateAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const adminUser = yield user_model_1.User.findOne({ _id: id });
    // console.log(adminUser === null || adminUser === void 0 ? void 0 : adminUser.password);
    const isPssMatch = (adminUser === null || adminUser === void 0 ? void 0 : adminUser.password) === (data === null || data === void 0 ? void 0 : data.password);
    if (!isPssMatch) {
        const salt = bcryptjs_1.default.genSaltSync(Number(env_1.envVars.SALT));
        const haspassword = bcryptjs_1.default.hashSync(data.password, salt);
        data.password = haspassword;
    }
    const user = yield user_model_1.User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    return user;
});
exports.UserService = {
    createUser,
    getMe,
    updateAdmin
};
