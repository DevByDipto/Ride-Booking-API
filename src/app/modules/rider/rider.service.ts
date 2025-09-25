import { log } from "console"
import { IRider } from "./rider.interface"
import { Rider } from "./rider.model"

const creatRider = (paylod:Partial<IRider>)=>{
    // console.log(req.body);
return paylod
}

const getAllRiders = async(filters:any)=>{
   if(filters.isBlocked){
    const riders = await Rider.find({isBlocked:filters.isBlocked})
    return riders
   }
    const riders = await Rider.find()
    return riders
}

const getRiderById = async(id:string)=>{
    console.log(`Rider id from service ${id}`);
    
    const rider = await Rider.findById(id)
    console.log("  Rider by id service",rider);
    
    return rider
}

export const riderService = {
    creatRider,
    getAllRiders,
    getRiderById
}