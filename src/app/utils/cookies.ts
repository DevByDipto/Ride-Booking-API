// utils/cookies.ts
import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthToken{
  accessToken?:string,
  refreshToken?:string
}

export const setAuthCookie = (res: Response, tokenInfo:AuthToken) => {


//   if(tokenInfo.accessToken){
// res.cookie('accessToken', tokenInfo.accessToken, {
//     httpOnly: true,
//     secure:true,
//     sameSite: "none",
//   //  path: '/',
//   // encode: String,
//   });
//   }

//   if(tokenInfo.refreshToken){
// res.cookie('refreshToken', tokenInfo.refreshToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//   //  path: '/',
//   // encode: String,

//   });
  }
  
};
