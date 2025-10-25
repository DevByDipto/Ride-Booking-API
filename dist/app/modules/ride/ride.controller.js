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
exports.rideController = void 0;
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createRide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield ride_service_1.rideService.createRide(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "drive Created Successfully",
        data: result,
    });
});
const getAllRides = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    const result = yield ride_service_1.rideService.getAllRides(queryParams);
    (0, sendResponse_1.sendResponse)(res, Object.assign({ statusCode: 200, success: true, message: "rides Retrieved Successfully" }, result));
});
const getRideById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    const ride = yield ride_service_1.rideService.getRideById(id);
    // console.log(" ride by id controller",ride);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "ride Retrieved Successfully",
        data: ride,
    });
});
// const getRideByDriverAndRiderId = async(req: Request, res: Response, next: NextFunction) => {
//     const query = req.query
//     console.log(query);
//     const ride =await rideService.getRideByDriverAndRiderId(query)
//     // console.log(" ride by id controller",ride);
//    sendResponse(res, {
//         statusCode: 200,
//         success: true,  
//         message: "ride Retrieved Successfully",
//         data: ride,
//     })
// }
const updateRideById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(req.params);
    const data = req.body;
    const ride = yield ride_service_1.rideService.updateRideById(id, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "ride update Successfully",
        data: ride,
    });
});
exports.rideController = {
    createRide,
    getAllRides,
    getRideById,
    // getRideByDriverAndRiderId,
    updateRideById
};
