import { Router } from "express"
import { validationRequest } from "../../middlewares/validateRequest"
import { UserZodSchema } from "./user.valodation"
import { userController } from "./user.controller"


const router = Router()

router.post("/register",validationRequest(UserZodSchema), userController.createUser)

export const userRouter = router