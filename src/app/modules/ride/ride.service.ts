import { log } from "console"
import { Ride } from "./ride.model"
import { IRide, IRideQueryParams } from "./ride.interface"
import { Rider } from "../rider/rider.model"
import { AppError } from "../../utils/AppError"
import { th } from "zod/v4/locales"
import mongoose from "mongoose"
import { paginate } from "../../utils/paginate"


const createRide = async (payload: IRide) => {
    // console.log(payload,"reom paylod");

    const isRiderExist = await Rider.findOne({ _id: payload.rider })

    if (!isRiderExist) {
        throw new AppError("You are not a valid rider", 500)
    }



    // create new rider
    const ride = await Ride.create(payload)


    return ride
}



const getAllRides = async (queryParams:IRideQueryParams) => {
  const query: any = {};

  if (queryParams.driverId) query.driver = new mongoose.Types.ObjectId(queryParams.driverId);
  if (queryParams.riderId) query.rider = new mongoose.Types.ObjectId(queryParams.riderId);

  const page = parseInt(queryParams?.page as string) || 1;
  const limit = parseInt(queryParams?.limit as string) || 10;
   
  const result = await paginate(Ride, query, { page, limit });

  return result
};


const getRideById = async (id: string) => {
    // console.log(`Ride id from service ${id}`);
    const ride = await Ride.findById(id)
    // console.log("  Ride by id service", Ride);
    return ride
}

// const getRideByDriverAndRiderId = async (query: IRideQuery) => {
//     // console.log(`Ride id from service ${id}`);
// console.log(query);
//     // const ride = await Ride.findById(id)
//     // console.log("  Ride by id service", Ride);
//     return "ride"
// }

const updateRideById = async (id: string, data: Partial<IRide>) => {

    if(!data.driver && !data.rider){
        throw new AppError("You must provide driverId or riderId to update the ride", 400)
    }
    
    if(data.updatedBy === "rider" && data.status !== "requested"){
    throw new AppError("after accept the ride by driver rider cann't cancle the ride", 400)
    } // ai j cheking ta ami dilam aita to basically frontend theke e check hobe tahole amar ar kii korar dorkar chilo ? (support)

    const ride = await Ride.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
    )

    return ride
}

export const rideService = {
    createRide,
    getAllRides,
    getRideById,
    // getRideByDriverAndRiderId,
    updateRideById
}