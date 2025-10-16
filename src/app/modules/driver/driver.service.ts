
import { log } from "console"
import { IDriver, IGetAllDriverQuery, TDriverUpdate } from "./driver.interface"
import { User } from "../user/user.model"
import { Driver } from "./driver.model"
import { Rider } from "../rider/rider.model"
import { IRider } from "../rider/rider.interface"
import { AppError } from "../../utils/AppError"
import bcrypt from "bcrypt"
import { envVars } from "../../config/env"
import { paginate } from "../../utils/paginate"
const creatDriver = async (payload: IDriver) => {

    const isUserExist = await User.findOne({ email: payload.email })

    if (!isUserExist) {
        // console.log(isUserExist);
        throw new AppError("You are not a valid user", 401)
    }

    // 1. নতুন Driver তৈরি
    const driver = await Driver.create(payload);

    // 2. User role update → "driver"
    await User.findOneAndUpdate(
        { email: payload.email },
        { $set: { role: "driver", driver: driver._id } },
        { new: true }
    );
    // 3. delete rider from user
    await User.updateOne(
        { email: payload.email },
        { $unset: { rider: "" } }
    );

    // 4. Rider model থেকে delete
    await Rider.findOneAndDelete({ email: payload.email });
    return driver
}

const getAllDrivers = async (queryParams: IGetAllDriverQuery) => {
    const page = parseInt(queryParams?.page as string) || 1;
    const limit = parseInt(queryParams?.limit as string) || 10;
    let filter = {}
    // if (queryParams.isApproved) filter= {isApproved:queryParams.isApproved}
    const result = await paginate(Driver, filter, { page, limit });
    
       return result
}

const getDriverById = async (id: string) => {
    console.log(`Rider id from service ${id}`);

    const driver = await Driver.findById(id)
    console.log("driver by id service", driver);

    return driver
}

const updateDriverStatusByAdmin = async (id: string, data: Partial<IRider>) => {
    // console.log(`Rider id from service ${id}`);

    const driver = await Driver.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
    )
    // console.log("  Rider by id service",rider);
    return driver
}

const updateDriverById = async (id: string, data: Partial<TDriverUpdate>) => {
    // console.log(`Rider id from service ${id}`);
    
    const driver = await Driver.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
 
    )

    const driverUser = await User.findOne({ driver: id })
    // console.log(driverUser?.password);
    const isPssMatch = driverUser?.password === data?.password
    
     if (!isPssMatch) {
            const salt = bcrypt.genSaltSync(Number(envVars.SALT));
                const haspassword = bcrypt.hashSync(data.password as string, salt)
                data.password = haspassword
                      }
    const user = await User.findOneAndUpdate(
                 { driver: id },
            { $set: {password:data.password,name:data.name} },
            { new: true }
        )  
        return {driver,user}   
}

export const driverService = {
    creatDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatusByAdmin,
    updateDriverById
}