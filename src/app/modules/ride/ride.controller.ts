import { NextFunction, Request, Response } from "express";
import { router } from "../../routes";
import { rideService } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { send } from "process";


const createRide =async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body 
    const result =await rideService.createRide(data)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "drivers Created Successfully",
        data: result,
    })
}

const getAllRides = async (req: Request, res: Response, next: NextFunction) => {
    const filters  = req.query
    const rides = await rideService.getAllRides(filters)
    sendResponse(res, { 
        statusCode: 200,
        success: true, 
        message: "rides Retrieved Successfully",       
        data: rides,
    })
}

const getRideById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    console.log(id);
    
    const ride =await rideService.getRideById(id)
    // console.log(" ride by id controller",ride);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "ride Retrieved Successfully",
        data: ride,
    })
}

// const getRideByDriverAndRiderId = async(req: Request, res: Response, next: NextFunction) => {
//     const query = req.query
//     console.log(query);
    
//     const ride =await rideService.getRideByDriverAndRiderId(query)
//     // console.log(" ride by id controller",ride);
    
//    sendResponse(res, {
//         statusCode: 200,
//         success: true,  
//         message: "ride Retrieved Successfully",
//         data: ride,
//     })
// }

const updateRideById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const data = req.body
    const ride =await rideService.updateRideById( id ,data)
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "ride update Successfully",
        data: ride,
    })
}
export const rideController = {
    createRide,
    getAllRides,
    getRideById,
    // getRideByDriverAndRiderId,
    updateRideById
}