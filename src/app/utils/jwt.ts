import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";

export const jwtHelpers = {
  createToken(payload: object,secret:string,expiresIn:string) {
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
  },

  verifyToken(token: string, secret:string) {
    return jwt.verify(token, secret);
  },
};