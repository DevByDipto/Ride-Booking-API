import { NextFunction, Request, Response } from "express";
import { router } from "../../routes";
import { riderService } from "./rider.service";


const creatRider = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const rider = riderService.creatRider(data)
    res.json(rider)
}

export const riderControler = {
    creatRider,
}