import { ObjectId } from "mongoose"

export enum Role{
    Rider= "rider",
    Driver ="driver",
    Admin ="admin"
}

export interface IUser {
    _id?:ObjectId
    rider:ObjectId
    driverId:ObjectId
    googleId?:string
    name: string
    email: string
    password?:string
    role?: Role
}