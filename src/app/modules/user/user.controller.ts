import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    // console.log(data);
    const result = await UserService.createUser(data)
    // throw new Error('made by me')
    // console.log(result);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created Successfully",
        data: result,
    })

})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find()
    // console.log(users);

   sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users Retrieved Successfully",
        data: users,
    })
}
)

const getMe =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization as string //req?.cookies?.accessToken || 
    // console.log(token);
    
    const result = await UserService.getMe(token)

    sendResponse(res,{
        statusCode:200,
        success: true,
        message: "Users Retrieved Successfully",
        data: result,
    })
})

const updateAdmin =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
       const data = req.body
       const rider =await UserService.updateAdmin(id,data)
       
      sendResponse(res, {
           statusCode: 200,
           success: true,  
           message: "driver update  Successfull",
           data: rider,
       })
})




export const userController = {
    createUser,
    getAllUsers,
    getMe,
    updateAdmin,
}