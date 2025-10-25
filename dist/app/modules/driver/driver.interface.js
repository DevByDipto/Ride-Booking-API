"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsApproved = exports.Vehicle = void 0;
var Vehicle;
(function (Vehicle) {
    Vehicle["Bike"] = "bike";
    Vehicle["Car"] = "car";
    Vehicle["Zip"] = "zip";
})(Vehicle || (exports.Vehicle = Vehicle = {}));
var IsApproved;
(function (IsApproved) {
    IsApproved["pending"] = "pending";
    IsApproved["aproved"] = "approved";
    IsApproved["suspend"] = "suspend";
})(IsApproved || (exports.IsApproved = IsApproved = {}));
