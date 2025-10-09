import { string, z } from "zod";
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

export const updateDriverZodSchema = z.object({
  vehicleInfo: z.nativeEnum(Vehicle),
  availability: z.boolean(),
  name: z.string(),
  phoneNumber: z
    .string()
    .refine(
      (val) => !val || /^\d{11}$/.test(val),
      "Phone number must be exactly 11 digits if provided"
    ),
  password: z.string()
});