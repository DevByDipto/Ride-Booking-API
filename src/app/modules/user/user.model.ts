import mongoose, { model, Types } from "mongoose"
import { IUser, Role } from "./user.interface"
import { Schema } from "mongoose"
import { Vehicle } from "../driver/driver.interface"

const userSchema = new Schema<IUser>({
     rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider", 
   
  },
     driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver", 
  },
  googleId:{type:String},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,minlength:6,required:true},
    role:{type:String,enum:Object.values(Role),required:true},
    vehicleInfo:{type:String,enum:Object.values(Vehicle)},
    phoneNumber:{type:String,required:true},
},
{ timestamps: true,versionKey: false }
)

export const User = model<IUser>("User", userSchema) // aikhane IUser keno use korsi ??