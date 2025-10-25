"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rider = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const riderSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    role: { type: String, enum: ['rider'], default: 'rider' },
    isBlocked: { type: Boolean, default: false },
    phoneNumber: { type: zod_1.string, required: true },
}, { timestamps: true, versionKey: false });
exports.Rider = (0, mongoose_1.model)("Rider", riderSchema);
