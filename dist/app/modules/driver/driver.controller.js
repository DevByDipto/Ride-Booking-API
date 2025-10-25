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
exports.driverController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
const createDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield driver_service_1.driverService.creatDriver(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "drivers Created Successfully",
        data: result,
    });
});
const getAllDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    const result = yield driver_service_1.driverService.getAllDrivers(queryParams);
    (0, sendResponse_1.sendResponse)(res, Object.assign({ statusCode: 200, success: true, message: "drivers Retrieved Successfully" }, result));
});
const getDriverById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.driverId;
    // console.log(" driver id from controller",id);
    const driver = yield driver_service_1.driverService.getDriverById(id);
    // console.log(" driver by id controller",driver);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "driver Retrieved Successfully",
        data: driver,
    });
});
const updateDriverStatusByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.driverId;
    const data = req.body;
    const rider = yield driver_service_1.driverService.updateDriverStatusByAdmin(id, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "driver update  Successfull",
        data: rider,
    });
});
const updateDriverById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.driverId;
    const data = req.body;
    const rider = yield driver_service_1.driverService.updateDriverById(id, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "driver update  Successfull",
        data: rider,
    });
});
exports.driverController = {
    createDriver,
    getAllDriver,
    getDriverById,
    updateDriverStatusByAdmin,
    updateDriverById
};
