import mongoose, { model, Schema } from "mongoose";
import { IDriver, IsApproved, Vehicle } from "./driver.interface";
// console.log(Vehicle.Car);

const driverschema = new Schema<IDriver>({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    role: { type: String, enum: ['driver'], default: 'driver' },
    vehicleInfo: { type:String, enum: Object.values(Vehicle), required: true },
    availability: { type: Boolean, default:true },
    isApproved: { type: String, enum: Object.values(IsApproved), default: IsApproved.pending },
    phoneNumber: { type: String, required:true },
},
{ timestamps: true,versionKey: false  }
)

export const Driver = model<IDriver>("Driver", driverschema)
