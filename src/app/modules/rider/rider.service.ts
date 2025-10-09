import { log } from "console"
import { IRider } from "./rider.interface"
import { Rider } from "./rider.model"
import { User } from "../user/user.model"
import bcrypt from "bcrypt"
import { envVars } from "../../config/env"



const getAllRiders = async (filters: any) => {
    if (filters.isBlocked) {
        const riders = await Rider.find({ isBlocked: filters.isBlocked })
        return riders
    }
    const riders = await Rider.find()
    return riders
}

const getRiderById = async (id: string) => {
    // console.log(`Rider id from service ${id}`);

    const rider = await Rider.findById(id)
    // console.log("  Rider by id service",rider);

    return rider
}

const updateRiderById = async (id: string, data: Partial<IRider>) => {
    // console.log(`Rider id from service ${id}`);
let user;
    const rider = await Rider.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
    )

    if (data.password) {
        const salt = bcrypt.genSaltSync(Number(envVars.SALT));
            const haspassword = bcrypt.hashSync(data.password as string, salt)
            data.password = haspassword
         user = await User.findOneAndUpdate(
             { rider: id },
        { $set: {password:data.password,name:data.name} },
        { new: true }
    )     
    }
    // console.log("  Rider by id service",rider);

    return {rider,user}
}

export const riderService = {
    getAllRiders,
    getRiderById,
    updateRiderById
}