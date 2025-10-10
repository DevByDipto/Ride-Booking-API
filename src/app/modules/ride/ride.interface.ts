import { Types } from "mongoose";
import { Role } from "../user/user.interface";

export interface IGetRideQueryParams {
  page?: string;
  limit?: string;
   riderId?:string,
    driverId?:string,
    status: RideStatus.Requested,
exclude:RideStatus.Requested | RideStatus.Cancelled
}

export enum RideStatus {
  Requested = "requested", //(support) value capital letter diye shuru hobe naki small letter diye  ??
  Accepted = "accepted",
  PickedUp = "picked-up",
  InTransit = "intransited",
  Completed = "completed",
  Cancelled = "cancelled",
  NoResponse = "noResponse"
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
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  status: RideStatus;
  timestamps: IRideTimestamps;
  updatedBy?: Role;
  fare: number;
  isPaymentCompleted?: boolean;
}

export interface IRideStatusUpdate{
  rider?: Types.ObjectId;
  driver?: Types.ObjectId;
  updatedBy: Role;
  status: RideStatus;
  timestamps: IRideTimestamps;
}