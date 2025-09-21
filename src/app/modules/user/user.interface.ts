import { ObjectId } from "mongoose"

export enum Role{
    Rider= "Rider",
    Driver ="Driver"
}

export interface IUser {
    _id?:ObjectId
    name: string
    email: string
    password?:string
    googleId?:string
    role?: Role
}