"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const ride_controller_1 = require("./ride.controller");
const ride_validation_1 = require("./ride.validation");
const router = (0, express_1.Router)();
router.post('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Rider), (0, validateRequest_1.validationRequest)(ride_validation_1.rideZodSchema), ride_controller_1.rideController.createRide);
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Admin, user_interface_1.Role.Rider, user_interface_1.Role.Driver), ride_controller_1.rideController.getAllRides); // jodi shobai e aii route er access pay thole security issue hobe nah ? (support) 
router.get('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Admin, user_interface_1.Role.Rider, user_interface_1.Role.Driver), ride_controller_1.rideController.getRideById);
// router.get('/',checkAuth(Role.Admin,Role.Rider,Role.Driver),rideController.getRideByDriverAndRiderId)
router.patch('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Rider, user_interface_1.Role.Driver), (0, validateRequest_1.validationRequest)(ride_validation_1.updateRideZodSchema), ride_controller_1.rideController.updateRideById);
exports.rideRouter = router;
