import { z } from "zod";
import { IsApproved, Vehicle } from "./driver.interface"; // enum import

export const createDriverSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"), 
  vehicleInfo: z.nativeEnum(Vehicle),
  availability: z.boolean(),
});

export const adminUpdateDriverStatusZodSchema = z.object({
  isApproved: z.nativeEnum(IsApproved),
});

export const updateDriverAvailabilityZodSchema = z.object({
  availability: z.boolean(),
});