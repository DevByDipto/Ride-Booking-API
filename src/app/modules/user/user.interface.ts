import { ObjectId } from "mongoose"
import { Vehicle } from "../driver/driver.interface"

export enum Role{
    Rider= "rider",
    Driver ="driver",
    Admin ="admin"
}

export interface IUser {
    _id?:ObjectId
    rider?:ObjectId
    driver?:ObjectId
    googleId?:string
    name: string
    email: string
    password?:string
    role: Role
    vehicleInfo?: Vehicle
    phoneNumber:string
}

export interface TAdminUpdate{
    name: string
        phoneNumber: string
        password: string
}