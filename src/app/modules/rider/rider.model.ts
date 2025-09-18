import mongoose, {  model, Schema } from "mongoose";
import { IRider } from "./rider.interface";


const riderSchema = new Schema<IRider>({
    googleId:{type:String},
    name:{type:String,require:true},
    email:{type:String,require:true},
    role:{type:String,enum:['rider'],default:'rider'},
    isBlocked:{type:Boolean}
},
{ timestamps: true }
)

export const Rider = model<IRider>("Rider", riderSchema)