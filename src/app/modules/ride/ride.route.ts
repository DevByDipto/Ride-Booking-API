import { Router } from "express"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import { validationRequest } from "../../middlewares/validateRequest"
import { rideController } from "./ride.controller"
import { rideZodSchema, updateRideZodSchema } from "./ride.validation"


const router = Router()

router.post('/',checkAuth(Role.Rider),validationRequest(rideZodSchema),rideController.createRide)
router.get('/',checkAuth(Role.Admin,Role.Rider,Role.Driver),rideController.getAllRides)  // jodi shobai e aii route er access pay thole security issue hobe nah ? (support)
router.get('/:id',checkAuth(Role.Admin,Role.Rider,Role.Driver),rideController.getRideById)
// router.get('/',checkAuth(Role.Admin,Role.Rider,Role.Driver),rideController.getRideByDriverAndRiderId)
router.patch('/:id',checkAuth(Role.Rider,Role.Driver),validationRequest(updateRideZodSchema),rideController.updateRideById)

export const rideRouter = router
