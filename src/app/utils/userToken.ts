import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env"
import { IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model";
import { jwtHelpers } from "./jwt"
import { AppError } from "./AppError";
import { Rider } from "../modules/rider/rider.model";
import { Driver } from "../modules/driver/driver.model";

// interface TokenPayload{
//     _id:string,
//     role:string
// }
// Partial<IUser>
export const createUserToken = (user:Partial<IUser>)=>{ 
const payload = { id: user._id, email: user.email, role: user.role};

const accessToken = jwtHelpers.createToken(payload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES )

const refreshToken = jwtHelpers.createToken(payload,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRES )

return{
    accessToken,
    refreshToken
}
}

export const takeRefreshTokenAndGenerateNewAccessToken = async (refreshToken:string)=>{
const verifiedRefreshToken = jwtHelpers.verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload

// console.log(verifiedRefreshToken);

const  isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

 if (!isUserExist) {
        throw new AppError("User does not exist",400)
    }

     if (verifiedRefreshToken.role == Role.Rider) {
                const rider = await Rider.findOne({ email: verifiedRefreshToken.email })
                if (!rider) {
                    throw new AppError("You are not a valid rider", 403)
                }
                if (rider.isBlocked) {
                    throw new AppError("You are blocked by admin", 403)
                }
            }
    
            if (verifiedRefreshToken.role == Role.Driver) {
                const driver = await Driver.findOne({ email: verifiedRefreshToken.email })
                if (!driver) {
                    throw new AppError("You are not a valid rider", 403)
                }
                if (driver.isApproved == "suspend") {
                    throw new AppError("You are suspend by admin", 403)
                }
            }

            const payload = { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role};
const newAccessToken = jwtHelpers.createToken(payload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES )

return newAccessToken;
}

