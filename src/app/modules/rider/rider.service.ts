import { log } from "console"
import { IRider } from "./rider.interface"
import { Rider } from "./rider.model"



const getAllRiders = async(filters:any)=>{
   if(filters.isBlocked){
    const riders = await Rider.find({isBlocked:filters.isBlocked})
    return riders
   }
    const riders = await Rider.find()
    return riders
}

const getRiderById = async(id:string)=>{
    // console.log(`Rider id from service ${id}`);
    
    const rider = await Rider.findById(id)
    // console.log("  Rider by id service",rider);
    
    return rider
}

const updateRiderById = async(id:string,data:Partial<IRider>)=>{
    // console.log(`Rider id from service ${id}`);
    
    const rider = await Rider.findOneAndUpdate(
         { _id:id },          
    { $set: data },   
    { new: true }  
    )
    // console.log("  Rider by id service",rider);
    
    return rider
}

export const riderService = {
    getAllRiders,
    getRiderById,
    updateRiderById
}