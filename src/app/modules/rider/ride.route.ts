import { Router } from "express"
import { riderControler } from "./rider.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import { validationRequest } from "../../middlewares/validateRequest"
import { riderBlockStatusZodSchema } from "./rider.validation"


const router = Router()

router.get('/',checkAuth(Role.Admin),riderControler.getAllRiders)
router.get('/:id',checkAuth(Role.Rider),riderControler.getRiderById)
router.patch('/:id',checkAuth(Role.Admin),
// validationRequest(riderBlockStatusZodSchema),
riderControler.updateRiderById)

export const riderRouter = router
