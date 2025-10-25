"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideZodSchema = exports.rideZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const user_interface_1 = require("../user/user.interface");
// objectId validation
const objectIdSchema = zod_1.z.string().refine(mongoose_1.Types.ObjectId.isValid, {
    message: "Invalid ObjectId",
});
// Location Schema
const locationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    lat: zod_1.z.number(),
    lon: zod_1.z.number(),
});
// Ride Timestamps Schema (সব optional)
const rideTimestampsSchema = zod_1.z.object({
    requestedAt: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
    acceptedAt: zod_1.z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    pickedUpAt: zod_1.z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    intransitedAt: zod_1.z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    completedAt: zod_1.z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    cancelledAt: zod_1.z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
});
// Ride Schema
exports.rideZodSchema = zod_1.z.object({
    rider: objectIdSchema,
    //   driverId: z
    //     .string()
    //     .refine((val) => Types.ObjectId.isValid(val), {
    //       message: "Invalid driverId",
    //     })
    //     .optional(),
    pickupLocation: locationSchema,
    destinationLocation: locationSchema,
    status: zod_1.z.nativeEnum(ride_interface_1.RideStatus),
    timestamps: rideTimestampsSchema,
    fare: zod_1.z.number(),
    //   isPaymentCompleted: z.boolean().optional(),
});
// update ride schema
exports.updateRideZodSchema = zod_1.z.object({
    driver: objectIdSchema.optional(),
    rider: objectIdSchema.optional(),
    status: zod_1.z.nativeEnum(ride_interface_1.RideStatus),
    updatedBy: zod_1.z.nativeEnum(user_interface_1.Role),
    timestamps: rideTimestampsSchema
});
