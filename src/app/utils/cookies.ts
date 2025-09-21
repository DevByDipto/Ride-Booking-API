// utils/cookies.ts
import { Response } from "express";

export interface AuthToken{
  accessToken?:string,
  refreshToken?:string
}

export const setAuthCookie = (res: Response, tokenInfo:AuthToken) => {
  const maxAge = 1 * 24 * 60 * 60 * 1000; // days → ms

  if(tokenInfo.accessToken){
res.cookie('accesstoken', tokenInfo.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  });
  }

  if(tokenInfo.refreshToken){
res.cookie('accesstoken', tokenInfo.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  });
  }
  
};
