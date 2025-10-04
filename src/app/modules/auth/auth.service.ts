import { envVars } from "../../config/env";
import { AppError } from "../../utils/AppError";
import { takeRefreshTokenAndGenerateNewAccessToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const getNewAccessToken = async (refreshToken: string) => {

   const newAccessToken =await takeRefreshTokenAndGenerateNewAccessToken(refreshToken)
    return {
        accessToken: newAccessToken
    }
}

export const authService = {
  getNewAccessToken,
}