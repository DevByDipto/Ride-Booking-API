// utils/cookies.ts
import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthToken{
  accessToken?:string,
  refreshToken?:string
}

export const setAuthCookie = (res: Response, tokenInfo:AuthToken) => {
  const maxAge = 1 * 24 * 60 * 60 * 1000; // days → ms

  if(tokenInfo.accessToken){
res.cookie('accessToken', tokenInfo.accessToken, {
    httpOnly: true,
    secure:true,
    sameSite: "none",
    // maxAge,
  });
  }

  if(tokenInfo.refreshToken){
res.cookie('refreshToken', tokenInfo.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // maxAge,
  });
  }
  
};
