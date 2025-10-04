import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import passport from "passport";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/cookies";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


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
    // console.log("it's work");
    
    
    // throw new Error("made by me") // line 40
    // console.log(user);
    
    
    
    const userTokens = createUserToken(user);
    setAuthCookie(res, userTokens);
    res.json({
      success: true,
      message: "Login successful",
      user,
      tokens: userTokens
    });
  })(req, res, next);
}

const logout = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

   res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
 
   sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    })
})
export const authController = {
    googleCallBackUrl,
    credentialLogin,
    logout
}