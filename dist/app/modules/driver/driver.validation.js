"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDriverZodSchema = exports.adminUpdateDriverStatusZodSchema = exports.createDriverSchema = void 0;
const zod_1 = require("zod");
const driver_interface_1 = require("./driver.interface"); // enum import
exports.createDriverSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email address"),
    vehicleInfo: zod_1.z.nativeEnum(driver_interface_1.Vehicle),
    availability: zod_1.z.boolean(),
});
exports.adminUpdateDriverStatusZodSchema = zod_1.z.object({
    isApproved: zod_1.z.nativeEnum(driver_interface_1.IsApproved),
});
exports.updateDriverZodSchema = zod_1.z.object({
    vehicleInfo: zod_1.z.nativeEnum(driver_interface_1.Vehicle),
    availability: zod_1.z.boolean(),
    name: zod_1.z.string(),
    phoneNumber: zod_1.z
        .string()
        .refine((val) => !val || /^\d{11}$/.test(val), "Phone number must be exactly 11 digits if provided"),
    password: zod_1.z.string()
});
