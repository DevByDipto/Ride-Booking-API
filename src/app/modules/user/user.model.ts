import { model, Types } from "mongoose"
import { IUser, Role } from "./user.interface"
import { Schema } from "mongoose"

const userSchema = new Schema<IUser>({
    _id: { type: Types.ObjectId },
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    googleId:{type:String},
    role:{type:String,enum:Object.values(Role),default:'Rider'},
},
{ timestamps: true,versionKey: false }
)

export const User = model<IUser>("User", userSchema) // aikhane IUser keno use korsi ??