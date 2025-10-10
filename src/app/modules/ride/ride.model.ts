import mongoose, { Schema, Document } from "mongoose";
import { RideStatus, IRide } from "./ride.interface"; 
import { Role } from "../user/user.interface";

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  { _id: false } 
);

const RideTimestampsSchema = new Schema(
  {
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date,default:null },
    pickedUpAt: { type: Date,default:null },
    intransitedAt: { type: Date,default:null },
    completedAt: { type: Date,default:null },
    cancelledAt: { type: Date,default:null },
  },
  { _id: false }
);

const RideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: "Rider", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Driver" },

    pickupLocation: { type: LocationSchema, required: true },
    destinationLocation: { type: LocationSchema, required: true },

    status: {
      type: String,
      enum: Object.values(RideStatus), 
      default: RideStatus.Requested,
    },
    updatedBy: {
      type: String,
      enum: Object.values(Role), 
    },

    timestamps: { type: RideTimestampsSchema, default: {} },
    fare: { type: Number, required: true },
isPaymentCompleted: { type: Boolean, default: false },
  },
  { timestamps: true,versionKey: false  } // createdAt, updatedAt auto add হবে
);

export const Ride = mongoose.model<IRide>("Ride", RideSchema);
