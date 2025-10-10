import { log } from "console"
import { IGetAllRiderQuery, IRider } from "./rider.interface"
import { Rider } from "./rider.model"
import { User } from "../user/user.model"
import bcrypt from "bcrypt"
import { envVars } from "../../config/env"
import { paginate } from "../../utils/paginate"



const getAllRiders = async (queryParams: IGetAllRiderQuery) => {
    const page = parseInt(queryParams?.page as string) || 1;
    const limit = parseInt(queryParams?.limit as string) || 10;
    let filter = {}
    // if (queryParams.isBlocked) filter = { isBlocked: queryParams.isBlocked }
    const result = await paginate(Rider, filter, { page, limit });
    return result
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
            { $set: { password: data.password, name: data.name } },
            { new: true }
        )
    }
    // console.log("  Rider by id service",rider);

    return { rider, user }
}

export const riderService = {
    getAllRiders,
    getRiderById,
    updateRiderById
}