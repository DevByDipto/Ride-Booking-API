import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";


const googleCallBackUrl = (req: Request, res: Response, next: NextFunction) => {
    const redirectTo = req.query.state as string || '/';
    
    res.redirect(redirectTo);
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body
// console.log(data);

      const result = await authService.createUser(data)

      res.json({
        message:"success"
      })

}


export const authController = {
    googleCallBackUrl,
    createUser,
}