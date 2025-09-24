import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";


const createUser =catchAsync( async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body
// console.log(data);
      const result = await UserService.createUser(data)
      // throw new Error('made by me')
console.log(result);
      res.json({
        message:"success"
      })

})

export const userController = {
    createUser,
   
}