import { Router } from "express";
import { riderRouter } from "../modules/rider/ride.route";
import { authRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/user/user.route";
import { driverRouter } from "../modules/driver/driver.route";
import { rideRouter } from "../modules/ride/ride.route";


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
    {path:'/driver',
        route: driverRouter
    },
    {path:'/ride',
        route: rideRouter
    },
   
]

routes.forEach((route)=>router.use(route.path,route.route))

  