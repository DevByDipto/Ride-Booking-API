"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
// console.log(Vehicle.Car);
const driverschema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['driver'], default: 'driver' },
    vehicleInfo: { type: String, enum: Object.values(driver_interface_1.Vehicle), required: true },
    availability: { type: Boolean, default: true },
    isApproved: { type: String, enum: Object.values(driver_interface_1.IsApproved), default: driver_interface_1.IsApproved.pending },
    phoneNumber: { type: String, required: true },
}, { timestamps: true, versionKey: false });
exports.Driver = (0, mongoose_1.model)("Driver", driverschema);
