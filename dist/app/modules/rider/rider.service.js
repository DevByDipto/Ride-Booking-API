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
exports.riderService = void 0;
const rider_model_1 = require("./rider.model");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
const paginate_1 = require("../../utils/paginate");
const getAllRiders = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) || 1;
    const limit = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) || 10;
    let filter = {};
    // if (queryParams.isBlocked) filter = { isBlocked: queryParams.isBlocked }
    const result = yield (0, paginate_1.paginate)(rider_model_1.Rider, filter, { page, limit });
    return result;
});
const getRiderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const rider = yield rider_model_1.Rider.findById(id);
    // console.log("  Rider by id service",rider);
    return rider;
});
const updateRiderById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Rider id from service ${id}`);
    const rider = yield rider_model_1.Rider.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    if (data.password) {
        const riderUser = yield user_model_1.User.findOne({ rider: id });
        const isPssMatch = (riderUser === null || riderUser === void 0 ? void 0 : riderUser.password) === (data === null || data === void 0 ? void 0 : data.password);
        if (!isPssMatch) {
            const salt = bcrypt_1.default.genSaltSync(Number(env_1.envVars.SALT));
            const haspassword = bcrypt_1.default.hashSync(data.password, salt);
            data.password = haspassword;
        }
    }
    // console.log("  Rider by id service",rider);
    const user = yield user_model_1.User.findOneAndUpdate({ rider: id }, { $set: { password: data.password, name: data.name } }, { new: true });
    return { rider, user };
});
exports.riderService = {
    getAllRiders,
    getRiderById,
    updateRiderById
};
