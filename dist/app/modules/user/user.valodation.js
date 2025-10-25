"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
const driver_interface_1 = require("../driver/driver.interface");
exports.UserZodSchema = zod_1.default.object({
    role: zod_1.default.nativeEnum(user_interface_1.Role),
    vehicleInfo: zod_1.default.nativeEnum(driver_interface_1.Vehicle),
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    phoneNumber: zod_1.default
        .string()
        .refine((val) => !val || /^\d{11}$/.test(val), "Phone number must be exactly 11 digits if provided"),
});
