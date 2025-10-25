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
exports.rideService = void 0;
const ride_model_1 = require("./ride.model");
const rider_model_1 = require("../rider/rider.model");
const AppError_1 = require("../../utils/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const paginate_1 = require("../../utils/paginate");
const createRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload,"reom paylod");
    const isRiderExist = yield rider_model_1.Rider.findOne({ _id: payload.rider });
    if (!isRiderExist) {
        throw new AppError_1.AppError("You are not a valid rider", 500);
    }
    // create new rider
    const ride = yield ride_model_1.Ride.create(payload);
    return ride;
});
const getAllRides = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId } = queryParams; // driverId optional, query parameter হিসেবে
    const { status } = queryParams;
    const { exclude } = queryParams;
    let filter = {};
    if (status === "requested") {
        // 1️⃣ Requested rides only
        filter.status = "requested";
    }
    else if (exclude) {
        // 2️⃣ Requested ও Cancelled বাদ দিয়ে, driverId filter
        if (!driverId) {
            // return res.status(400).json({
            //   success: false,
            //   message: "driverId is required when status is not 'requested'",
            // });
        }
        filter.driver = driverId;
        const statuses = exclude.split(",");
        filter.status = { $nin: statuses };
    }
    if (queryParams.driverId)
        filter.driver = new mongoose_1.default.Types.ObjectId(queryParams.driverId);
    if (queryParams.riderId)
        filter.rider = new mongoose_1.default.Types.ObjectId(queryParams.riderId);
    const page = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) || 1;
    const limit = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) || 10;
    const result = yield (0, paginate_1.paginate)(ride_model_1.Ride, filter, { page, limit });
    return result;
});
const getRideById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Ride id from service ${id}`);
    const ride = yield ride_model_1.Ride.findById(id);
    // console.log("  Ride by id service", Ride);
    return ride;
});
// const getRideByDriverAndRiderId = async (query: IRideQuery) => {
//     // console.log(`Ride id from service ${id}`);
// console.log(query);
//     // const ride = await Ride.findById(id)
//     // console.log("  Ride by id service", Ride);
//     return "ride"
// }
const updateRideById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("updateRideById",data);
    // return ""
    if (!data.driver && !data.rider) {
        throw new AppError_1.AppError("You must provide driverId or riderId to update the ride", 400);
    }
    if (data.updatedBy === "rider" && data.status !== "requested") {
        throw new AppError_1.AppError("after accept the ride by driver rider cann't cancle the ride", 400);
    }
    // console.log(data);
    const ride = yield ride_model_1.Ride.findOneAndUpdate({ _id: id }, {
        $set: {
            status: data.status,
            updatedBy: data.updatedBy,
            driver: data.driver,
            [`timestamps.${data.status}At`]: new Date().toISOString(),
        },
    }, { new: true });
    return ride;
});
exports.rideService = {
    createRide,
    getAllRides,
    getRideById,
    // getRideByDriverAndRiderId,
    updateRideById
};
