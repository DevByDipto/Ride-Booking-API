"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.riderZodSchema = void 0;
const zod_1 = require("zod");
exports.riderZodSchema = zod_1.z.object({
    isBlocked: zod_1.z.boolean().optional(),
    name: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
    password: zod_1.z.string().optional()
});
