/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { AppError } from "../utils/AppError"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500
    let message = "Something Went Wrong!!"
console.dir(err);

   if (err instanceof AppError) { 
        statusCode = err.statusCode
        message = err.message
        // console.log(message);        
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }
    // else if (err.name === "ZodError") {
    //     statusCode = 400;
    //     message = err.errors.map((e: { message: string }) => e.message).join(", ")
    // }

    res.status(statusCode).json({
        success: false,
        messageeeee:message,
        err,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}