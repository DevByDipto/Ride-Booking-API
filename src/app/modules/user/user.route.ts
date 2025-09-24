import { Router } from "express"
import { validationRequest } from "../../middlewares/validateRequest"
import { UserZodSchema } from "./user.valodation"
import { userController } from "./user.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "./user.interface"



const router = Router()

router.post("/register",validationRequest(UserZodSchema), userController.createUser)
router.get("/",checkAuth(Role.Admin),userController.getAllUsers)

export const userRouter = router