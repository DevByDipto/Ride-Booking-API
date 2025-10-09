import { sendResponse } from "../../utils/sendResponse"
import { IDriver } from "./driver.interface"
import { NextFunction, Request, Response } from "express";
import { driverService } from "./driver.service";


const createDriver =async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body 
    const result =await driverService.creatDriver(data)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "drivers Created Successfully",
        data: result,
    })
}

const getAllDriver = async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.query
    const drivers = await driverService.getAllDrivers(filters)
    sendResponse(res, { 
        statusCode: 200,
        success: true, 
        message: "drivers Retrieved Successfully",       
        data: drivers,
    })
}

const getDriverById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.driverId
    // console.log(" driver id from controller",id);
    
    const driver =await driverService.getDriverById( id )
    // console.log(" driver by id controller",driver);
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "driver Retrieved Successfully",
        data: driver,
    })
}

const updateDriverStatusByAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.driverId
    const data = req.body
    const rider =await driverService.updateDriverStatusByAdmin(id,data )
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "driver update  Successfull",
        data: rider,
    })
}

const updateDriverById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.driverId
    const data = req.body
    const rider =await driverService.updateDriverById(id,data)
    
   sendResponse(res, {
        statusCode: 200,
        success: true,  
        message: "driver update  Successfull",
        data: rider,
    })
}

export const driverController={
    createDriver,
    getAllDriver,
    getDriverById,
    updateDriverStatusByAdmin,
    updateDriverById
}