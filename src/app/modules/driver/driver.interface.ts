export enum Vehicle {
  Bike = "bike",
  Car = "car", 
  Zip = "zip",
}

export enum IsApproved{
pending="pending",
aproved="approved",
suspend="suspend",
}

export interface IDriver {
    name: string
    email: string
    role?: "driver"
    vehicleInfo:Vehicle
    availability?:boolean
    isApproved?:IsApproved
    phoneNumber:string
}

export interface TDriverUpdate {
    id?:string
    name: string
    vehicleInfo:Vehicle
    availability?:boolean
    isApproved?:IsApproved
    phoneNumber:string
    password:string
}