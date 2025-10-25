"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatus = void 0;
var RideStatus;
(function (RideStatus) {
    RideStatus["Requested"] = "requested";
    RideStatus["Accepted"] = "accepted";
    RideStatus["PickedUp"] = "picked-up";
    RideStatus["Intransited"] = "intransited";
    RideStatus["Completed"] = "completed";
    RideStatus["Cancelled"] = "cancelled";
    RideStatus["NoResponse"] = "noResponse";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
