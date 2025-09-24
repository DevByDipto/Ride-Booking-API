import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { AppError } from "../utils/AppError";
import { jwtHelpers } from "../utils/jwt";
import { User } from "../modules/user/user.model";
import { Rider } from "../modules/rider/rider.model";
import { Driver } from "../modules/driver/driver.model";

export const checkAuth = (role: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization

        if (!accessToken) {
            throw new AppError("No Token Recieved", 403)
        }

        const verifiedToken = jwtHelpers.verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        
        const user = await User.findOne({ email: verifiedToken.email })
        console.log(user);

        if (!user) {
            throw new AppError("User does not exist", 400)
        }

        if(role !== user.role){
            throw new AppError("You are not authorized to access this route", 403)
        }

        if (user.role == "Rider") {
            const rider = await Rider.findOne({ email: verifiedToken.email })
            if (!rider) {
                throw new AppError("You are not a valid rider", 403)
            }
            if (rider.isBlocked) {
                throw new AppError("You are blocked by admin", 403)
            }
        }

        if (user.role == "Driver") {
            const driver = await Driver.findOne({ email: verifiedToken.email })
            if (!driver) {
                throw new AppError("You are not a valid rider", 403)
            }
            if (driver.isApproved == "suspend") {
                throw new AppError("You are suspend by admin", 403)
            }
        }
        next()
    } catch (error) {
        next(error)
    }



}