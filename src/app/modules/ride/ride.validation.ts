import { z } from "zod";
import { Types } from "mongoose";
import { RideStatus } from "./ride.interface";
import { Role } from "../user/user.interface";


// objectId validation
const objectIdSchema = z.string().refine(Types.ObjectId.isValid, {
  message: "Invalid ObjectId",
});


// Location Schema
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
});

// Ride Timestamps Schema (সব optional)
const rideTimestampsSchema = z.object({
  requestedAt: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  acceptedAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  pickedUpAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  inTransitAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  completedAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  cancelledAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
});

// Ride Schema
export const rideZodSchema = z.object({
  riderId: objectIdSchema,
//   driverId: z
//     .string()
//     .refine((val) => Types.ObjectId.isValid(val), {
//       message: "Invalid driverId",
//     })
//     .optional(),

  pickupLocation: locationSchema,
  destinationLocation: locationSchema,

  status: z.nativeEnum(RideStatus),

  timestamps: rideTimestampsSchema,

  fare: z.number(),

//   isPaymentCompleted: z.boolean().optional(),
});

// update ride schema
export const updateRideZodSchema = z.object({
  driverId: objectIdSchema.optional(),  
  riderId: objectIdSchema.optional(),
  status: z.nativeEnum(RideStatus),
  updatedBy:z.nativeEnum(Role),
  timestamps: rideTimestampsSchema
});