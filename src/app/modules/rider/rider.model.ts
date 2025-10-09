import mongoose, {  model, Schema, Types } from "mongoose";
import { IRider } from "./rider.interface";


const riderSchema = new Schema<IRider>({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    role:{type:String,enum:['rider'],default:'rider'},
    isBlocked:{type:Boolean,default:false},
    phoneNumber:{type:Number},
},
{ timestamps: true,versionKey: false}
)

export const Rider = model<IRider>("Rider", riderSchema)