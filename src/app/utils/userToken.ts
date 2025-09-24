import { envVars } from "../config/env"
import { IUser } from "../modules/user/user.interface"
import { jwtHelpers } from "./jwt"

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

