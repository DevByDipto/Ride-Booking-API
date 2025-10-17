import { log } from "console"
import { Ride } from "./ride.model"
import { IGetRideQueryParams, IRide, IRideStatusUpdate } from "./ride.interface"
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



const getAllRides = async (queryParams:IGetRideQueryParams) => {
    
    const { driverId } = queryParams; // driverId optional, query parameter হিসেবে
    const { status } = queryParams;
    const { exclude } = queryParams;
  let filter: any = {}
  if (status === "requested") {
      // 1️⃣ Requested rides only
      filter.status = "requested";
    } else if (exclude) {
      // 2️⃣ Requested ও Cancelled বাদ দিয়ে, driverId filter
      if (!driverId) {
        // return res.status(400).json({
        //   success: false,
        //   message: "driverId is required when status is not 'requested'",
        // });
      }
      filter.driver = driverId;
       const statuses = (exclude as string).split(",");
  filter.status = { $nin: statuses };
    }
  if (queryParams.driverId) filter.driver = new mongoose.Types.ObjectId(queryParams.driverId);
  if (queryParams.riderId) filter.rider = new mongoose.Types.ObjectId(queryParams.riderId);

  const page = parseInt(queryParams?.page as string) || 1;
  const limit = parseInt(queryParams?.limit as string) || 10;
   
  const result = await paginate(Ride, filter, { page, limit });

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

const updateRideById = async (id: string, data:IRideStatusUpdate ) => {
// console.log("updateRideById",data);
// return ""
    if(!data.driver && !data.rider){
        throw new AppError("You must provide driverId or riderId to update the ride", 400)
    }
    
    if(data.updatedBy === "rider" && data.status !== "requested"){
    throw new AppError("after accept the ride by driver rider cann't cancle the ride", 400)
    } 
// console.log(data);
   const ride = await Ride.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        status: data.status,
        updatedBy: data.updatedBy,
        driver: data.driver,
        [`timestamps.${data.status}At`]: new Date().toISOString(),
      },
    },
    { new: true }
  );

    return ride
}

export const rideService = {
    createRide,
    getAllRides,
    getRideById,
    // getRideByDriverAndRiderId,
    updateRideById
}