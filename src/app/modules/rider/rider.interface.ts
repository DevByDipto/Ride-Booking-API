
// enum RideStatus {
//     Requested="Requested"
//     Accepted="Accepted"
//     picked_up="picked_up"
//     in_transit ,
//     Completed,
//     cancel,
// }
enum RideStatus {
    Requested="Requested",
    Accepted="Accepted",
    picked_up="picked_up",
    in_transit="in_transit",
    Completed="Completed",
    cancel="cancel",
}

export interface IRider {
    googleId?:string
    name: string
    email: string
    role?: "rider"
    isBlocked?: boolean
}