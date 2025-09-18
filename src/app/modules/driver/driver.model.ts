import mongoose, { model, Schema } from "mongoose";
import { IDriver, IsApproved, Vehicle } from "./driver.interface";
// console.log(Vehicle.Car);

const driverschema = new Schema<IDriver>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['driver'], default: 'driver' },
    isBlocked: { type: Boolean },
    vehicleInfo: { type:String, enum: Object.values(Vehicle), required: true },
    Availability: { type: Boolean, required: true },
    isApproved: { type: String, enum: Object.values(IsApproved), default: IsApproved.pending },
},
{ timestamps: true }
)

export const Driver = model<IDriver>("Driver", driverschema)
