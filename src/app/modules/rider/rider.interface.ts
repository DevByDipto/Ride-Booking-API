
// enum RideStatus {
//     Requested="Requested"
//     Accepted="Accepted"
//     picked_up="picked_up"
//     in_transit ,
//     Completed,
//     cancel,

import { ObjectId } from "mongoose"



// }
enum RideStatus { // (suppport)
    Requested="Requested",
    Accepted="Accepted",
    picked_up="picked_up",
    in_transit="in_transit",
    Completed="Completed",
    cancel="cancel",
}

export interface IRider {
    _id?:ObjectId
    name: string
    email: string
    password:string
    googleId?:string
    role?: "rider"
    isBlocked?: boolean,
    age?:number
}