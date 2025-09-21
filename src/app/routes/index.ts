import { Router } from "express";
import { app } from "../../app";
import { riderRouter } from "../modules/rider/ride.route";
import { authRouter } from "../modules/auth/auth.route";


export const router = Router()

const routes= [
    {path:'/rider',
        route: riderRouter
    },
    {path:'/auth',
        route: authRouter
    },
]

routes.forEach((route)=>router.use(route.path,route.route))

  