import { Router } from "express"
import { riderControler } from "./rider.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "../user/user.interface"


const router = Router()

router.post('/',riderControler.creatRider)
router.get('/',checkAuth(Role.Admin),riderControler.getAllRiders)
router.get('/:id',checkAuth(Role.Rider),riderControler.getRiderById)

export const riderRouter = router
