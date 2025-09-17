import { Types } from "mongoose";

export enum RideStatus {
  Requested = "Requested",
  Accepted = "Accepted",
  PickedUp = "Picked-up",
  InTransit = "Intransited",
  Completed = "Completed",
  Cancelled = "Cancelled",
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
  riderId: Types.ObjectId;   // ref: "Rider"
  driverId?: Types.ObjectId; // ref: "Driver"
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  status: RideStatus;
  timestamps: IRideTimestamps;
}
