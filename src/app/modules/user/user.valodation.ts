import z, { email } from "zod";
import { Role } from "./user.interface";
import { Vehicle } from "../driver/driver.interface";

export const UserZodSchema = z.object({
  role: z.nativeEnum(Role),
  vehicleInfo: z.nativeEnum(Vehicle),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),

});