import { envVars } from "../../config/env";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model"
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
// console.log(payload,"reom paylod");

    const isUserExist = await User.findOne({ email: payload.email })
    console.log(isUserExist);
    
    if (isUserExist) {
          throw new Error("user already exist")
    }
    
    const salt = bcrypt.genSaltSync(Number(envVars.SALT));
    const haspassword = bcrypt.hashSync(payload.password as string,salt)
    payload.password = haspassword
    // console.log(haspassword);
    
    // console.log(payload,"from 2nd payload");
    
    const user = await User.create(payload)
console.log(user);

    return user

}

export const authService = {
    createUser,
}