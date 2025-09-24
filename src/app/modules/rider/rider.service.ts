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
    const rider = await Rider.findById(id)
    // console.log(rider);
    
    return rider
}

export const riderService = {
    creatRider,
    getAllRiders,
    getRiderById
}