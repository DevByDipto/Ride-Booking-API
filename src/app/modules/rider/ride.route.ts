import { Router } from "express"
import { riderControler } from "./rider.controller"


const router = Router()

router.post('/',riderControler.creatRider)

export const riderRouter = router
