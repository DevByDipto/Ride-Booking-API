import { NextFunction, Request, Response } from "express";


const googleCallBackUrl = (req: Request, res: Response, next: NextFunction)=>{
const redirectTo = req.query.state as string || '/';
    res.redirect(redirectTo); 
}

export const authController={
    googleCallBackUrl
}