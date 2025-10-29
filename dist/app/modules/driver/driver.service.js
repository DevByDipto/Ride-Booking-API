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
exports.driverService = void 0;
const user_model_1 = require("../user/user.model");
const driver_model_1 = require("./driver.model");
const rider_model_1 = require("../rider/rider.model");
const AppError_1 = require("../../utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
const paginate_1 = require("../../utils/paginate");
const creatDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist) {
        // console.log(isUserExist);
        throw new AppError_1.AppError("You are not a valid user", 401);
    }
    // 1. নতুন Driver তৈরি
    const driver = yield driver_model_1.Driver.create(payload);
    // 2. User role update → "driver"
    yield user_model_1.User.findOneAndUpdate({ email: payload.email }, { $set: { role: "driver", driver: driver._id } }, { new: true });
    // 3. delete rider from user
    yield user_model_1.User.updateOne({ email: payload.email }, { $unset: { rider: "" } });
    // 4. Rider model থেকে delete
    yield rider_model_1.Rider.findOneAndDelete({ email: payload.email });
    return driver;
});
const getAllDrivers = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) || 1;
    const limit = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) || 10;
    let filter = {};
    // if (queryParams.isApproved) filter= {isApproved:queryParams.isApproved}
    const result = yield (0, paginate_1.paginate)(driver_model_1.Driver, filter, { page, limit });
    return result;
});
const getDriverById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const driver = yield driver_model_1.Driver.findById(id);
    // console.log("driver by id service", driver);
    return driver;
});
const updateDriverStatusByAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const driver = yield driver_model_1.Driver.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    // console.log("  Rider by id service",rider);
    return driver;
});
const updateDriverById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const driver = yield driver_model_1.Driver.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    const driverUser = yield user_model_1.User.findOne({ driver: id });
    // console.log(driverUser?.password);
    const isPssMatch = (driverUser === null || driverUser === void 0 ? void 0 : driverUser.password) === (data === null || data === void 0 ? void 0 : data.password);
    if (!isPssMatch) {
        const salt = bcrypt_1.default.genSaltSync(Number(env_1.envVars.SALT));
        const haspassword = bcrypt_1.default.hashSync(data.password, salt);
        data.password = haspassword;
    }
    const user = yield user_model_1.User.findOneAndUpdate({ driver: id }, { $set: { password: data.password, name: data.name } }, { new: true });
    return { driver, user };
});
exports.driverService = {
    creatDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatusByAdmin,
    updateDriverById
};
