import { Router } from "express";
import { app } from "../../app";
import { riderRouter } from "../modules/rider/ride.route";
import { authRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/user/user.route";


export const router = Router()

const routes= [
    {path:'/rider',
        route: riderRouter
    },
    {path:'/auth',
        route: authRouter
    },
    {path:'/user',
        route: userRouter
    },
   
]

routes.forEach((route)=>router.use(route.path,route.route))

  