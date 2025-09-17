import { Types } from "mongoose";

export enum RideStatus {
  Requested = "Requested",
  Accepted = "Accepted",
  PickedUp = "Picked-up",
  InTransit = "Intransited",
  Completed = "Completed",
  Cancelled = "Cancelled",
  NoResponse= "NoResponse"
}

export interface ILocation {
  name: string;
  lat: number;
  lon: number;
}

export interface IRideTimestamps {
  requestedAt?: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  inTransitAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}

export interface IRide {
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId;
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  status: RideStatus;
  timestamps: IRideTimestamps;

  fare: number;                  
  isPaymentCompleted?: boolean;   
}
