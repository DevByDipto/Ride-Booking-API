import { Router } from "express"
// import { riderControler } from "./rider.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import { validationRequest } from "../../middlewares/validateRequest"
import { driverController } from "./driver.controller"
import { adminUpdateDriverStatusZodSchema, createDriverSchema, updateDriverZodSchema } from "./driver.validation"


const router = Router()

router.post('/',checkAuth(Role.Rider),validationRequest(createDriverSchema),driverController.createDriver)
router.get('/',checkAuth(Role.Admin),driverController.getAllDriver)
router.get('/:driverId',checkAuth(Role.Driver),driverController.getDriverById)
router.patch('/:driverId/status',checkAuth(Role.Admin),validationRequest(adminUpdateDriverStatusZodSchema),driverController.updateDriverStatusByAdmin)
router.patch('/:driverId',checkAuth(Role.Driver),validationRequest(updateDriverZodSchema),driverController.updateDriverById)

export const driverRouter = router
