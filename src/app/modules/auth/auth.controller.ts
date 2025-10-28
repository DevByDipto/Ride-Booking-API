import { NextFunction, Request, response, Response } from "express";
import { authService } from "./auth.service";
import passport from "passport";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/cookies";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { set } from "mongoose";
import { success } from "zod";
import { envVars } from "../../config/env";


const googleCallBackUrl = (req: Request, res: Response, next: NextFunction) => {
    const redirectTo = req.query.state as string || '/';
    
    res.redirect(redirectTo);
}



const credentialLogin =(req:Request, res:Response, next:NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(new AppError("Authentication error", 500)); // line 30
    }
    
    // if (err) {
    //   console.log(err);
      
    //   return res.status(500).json({ 
    //     success: false, 
    //     message: "Authentication error"
    //   });
    // }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: info ? info.message : 'Login failed' 
      });
    }
    console.log("it's work");
    
    
    // throw new Error("made by me") // line 40
    // console.log(user);
    
    
    console.log(user);
    
    const userTokens = createUserToken(user);
    setAuthCookie(res, userTokens);
  console.log({userTokens});
  
    res.json({
      success: true,
      message: "Login successful",
      data:user,
      tokens: userTokens
    });
  })(req, res, next);
}

const getNewAccessToken = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  const refreshToken=  req.headers.authorization;
  // console.log(refreshToken);
   
   // console.log(refreshToken);
   
   if(!refreshToken){
    return next(new AppError("No refresh token found", 401))
   }
   
    const tokenInfo = await authService.getNewAccessToken(refreshToken)

    setAuthCookie(res, tokenInfo)

return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "New access token generated successfully",
        data: tokenInfo,
    })
  })
  // await authService.getNewAccessToken(refreshToken)



const logout = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
// console.log();

   res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  //  path: '/',
  // encode: String,

  })

  res.clearCookie('refreshToken',{
    httpOnly: true,
    secure: true,
    sameSite: "none",
  //  path: '/',
  // encode: String,

  })
//  console.log('Response headers:', res.getHeaders());
   sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    })
})


// const logout = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
//   // Manual set-cookie header দিয়ে try করো
//   res.setHeader('Set-Cookie', [
//     'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
//     'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None'
//   ]);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "User Logged Out Successfully",
//     data: null,
//   });
// });
export const AuthControllers = {
    googleCallBackUrl,
    credentialLogin,
    getNewAccessToken,
    logout
}