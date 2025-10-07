import mongoose, { model, Types } from "mongoose"
import { IUser, Role } from "./user.interface"
import { Schema } from "mongoose"

const userSchema = new Schema<IUser>({
     rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider", 
    required: true,
  },
     driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drtiver", 
  },
  googleId:{type:String},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,minlength:6},
    role:{type:String,enum:Object.values(Role),default:'rider'},
},
{ timestamps: true,versionKey: false }
)

export const User = model<IUser>("User", userSchema) // aikhane IUser keno use korsi ??