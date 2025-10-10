import { NextFunction, Request, Response } from "express";
import { router } from "../../routes";
import { riderService } from "./rider.service";
import { sendResponse } from "../../utils/sendResponse";
import { send } from "process";




const getAllRiders = async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.query
    const result = await riderService.getAllRiders(filters)
    
    sendResponse(res, { 
        statusCode: 200,
        success: true, 
        message: "Riders Retrieved Successfully",       
        ...result
    })
}

const getRiderById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const rider =await riderService.getRiderById( id )
    // console.log(" Rider by id controller",rider);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "Rider Retrieved Successfully",
        data: rider,
    })
}
const updateRiderById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    let data = req.body
    // if(data.password) 
    const result = await riderService.updateRiderById( id ,data)
    // console.log(" Rider by id controller",rider);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "Rider update Successfully",
        data: result,
    })
}
export const riderControler = {
    getAllRiders,
    getRiderById,
    updateRiderById
}