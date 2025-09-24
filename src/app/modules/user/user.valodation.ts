import z, { email } from "zod";

export const UserZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});