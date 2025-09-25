import { NextFunction, Request, Response } from "express";
import { router } from "../../routes";
import { riderService } from "./rider.service";
import { sendResponse } from "../../utils/sendResponse";
import { send } from "process";


const creatRider = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const rider = riderService.creatRider(data)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rider Created Successfully",
        data: rider,
    })
}

const getAllRiders = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query
    const riders = await riderService.getAllRiders(params)
    sendResponse(res, { 
        statusCode: 200,
        success: true, 
        message: "Riders Retrieved Successfully",       
        data: riders,
    })
}

const getRiderById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const rider =await riderService.getRiderById( id )
    console.log(" Rider by id controller",rider);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "Rider Retrieved Successfully",
        data: rider,
    })
}
const updateRiderById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const data = req.body
    const rider =await riderService.updateRiderById( id ,data)
    // console.log(" Rider by id controller",rider);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "Rider update Successfully",
        data: rider,
    })
}
export const riderControler = {
    creatRider,
    getAllRiders,
    getRiderById,
    updateRiderById
}