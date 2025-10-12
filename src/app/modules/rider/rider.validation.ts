import { number, z } from "zod";

export const riderZodSchema = z.object({
  isBlocked: z.boolean().optional(),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().optional()
});