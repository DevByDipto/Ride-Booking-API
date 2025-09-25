import { sendResponse } from "../../utils/sendResponse"
import { driverService, riderService } from "./driver.driverService"
import { IDriver } from "./driver.interface"
import { NextFunction, Request, Response } from "express";

const createDriver = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body 
    const result = driverService.creatDriver(data)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "drivers Created Successfully",
        data: result,
    })
}

const getAllDriver = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query
    const drivers = await driverService.getAllDriver(params)
    sendResponse(res, { 
        statusCode: 200,
        success: true, 
        message: "drivers Retrieved Successfully",       
        data: drivers,
    })
}

const getDriverById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const rider =await driverService.getDriverById( id )
    console.log(" driver by id controller",rider);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "driver Retrieved Successfully",
        data: rider,
    })
}

const updateDriverById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const data = req.data
    const rider =await driverService.updateDriverById(id,data )
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "driver update  Successfull",
        data: rider,
    })
}

export const driverController={
    createDriver,
    getAllDriver
}