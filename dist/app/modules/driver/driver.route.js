"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = require("express");
// import { riderControler } from "./rider.controller"
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const driver_controller_1 = require("./driver.controller");
const driver_validation_1 = require("./driver.validation");
const router = (0, express_1.Router)();
// router.post('/',checkAuth(Role.Rider),validationRequest(createDriverSchema),driverController.createDriver)
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Admin), driver_controller_1.driverController.getAllDriver);
router.get('/:driverId', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Driver), driver_controller_1.driverController.getDriverById);
router.patch('/:driverId/approval-status', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Admin), (0, validateRequest_1.validationRequest)(driver_validation_1.adminUpdateDriverStatusZodSchema), driver_controller_1.driverController.updateDriverStatusByAdmin);
router.patch('/:driverId', (0, checkAuth_1.checkAuth)(user_interface_1.Role.Driver), (0, validateRequest_1.validationRequest)(driver_validation_1.updateDriverZodSchema), driver_controller_1.driverController.updateDriverById);
exports.driverRouter = router;
