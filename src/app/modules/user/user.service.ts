import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { AppError } from "../../utils/AppError";
import { jwtHelpers } from "../../utils/jwt";
import { Rider } from "../rider/rider.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
    // console.log(payload,"reom paylod");

    const isUserExist = await User.findOne({ email: payload.email })
    // console.log(isUserExist);

    if (isUserExist) {
        throw new AppError("user already exist",500)
    }

    const salt = bcrypt.genSaltSync(Number(envVars.SALT));
    const haspassword = bcrypt.hashSync(payload.password as string, salt)
    payload.password = haspassword
    
// create new rider
    const rider = await Rider.create({
        email: payload.email,
        name: payload.name,
    })
// create new user
    const user = await User.create({...payload,rider:rider._id})
   

    return {user, rider}
}

const getMe =async (token: string)=>{

if (!token) {
    return new AppError("token not found",401)
}
 
const verifiedToken = jwtHelpers.verifyToken(token,envVars.JWT_ACCESS_SECRET) as JwtPayload
console.log(verifiedToken);

const user = await User.findOne({_id: verifiedToken.id}).populate("rider")
if(!user){
    return new AppError("User not found or account no longer exists", 404)
}
console.log("user",user);

return user
}

export const UserService = {
    createUser,
    getMe,
}