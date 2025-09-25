import { z } from "zod";

export const riderBlockStatusZodSchema = z.object({
  isBlocked: z.boolean(),
});