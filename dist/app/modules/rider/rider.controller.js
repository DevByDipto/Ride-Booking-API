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
exports.riderControler = void 0;
const rider_service_1 = require("./rider.service");
const sendResponse_1 = require("../../utils/sendResponse");
const getAllRiders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const result = yield rider_service_1.riderService.getAllRiders(filters);
    (0, sendResponse_1.sendResponse)(res, Object.assign({ statusCode: 200, success: true, message: "Riders Retrieved Successfully" }, result));
});
const getRiderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const rider = yield rider_service_1.riderService.getRiderById(id);
    // console.log(" Rider by id controller",rider);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rider Retrieved Successfully",
        data: rider,
    });
});
const updateRiderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let data = req.body;
    // if(data.password) 
    const result = yield rider_service_1.riderService.updateRiderById(id, data);
    // console.log(" Rider by id controller",rider);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rider update Successfully",
        data: result,
    });
});
exports.riderControler = {
    getAllRiders,
    getRiderById,
    updateRiderById
};
