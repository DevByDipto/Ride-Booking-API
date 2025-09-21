import mongoose, {  model, Schema, Types } from "mongoose";
import { IRider } from "./rider.interface";


const riderSchema = new Schema<IRider>({
    _id: { type: Types.ObjectId },
    name:{type:String,require:true},
    email:{type:String,require:true},
    role:{type:String,enum:['rider'],default:'rider'},
    isBlocked:{type:Boolean}
},
{ timestamps: true,versionKey: false  }
)

export const Rider = model<IRider>("Rider", riderSchema)