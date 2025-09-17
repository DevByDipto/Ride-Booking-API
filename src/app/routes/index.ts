import { Router } from "express";
import { app } from "../../app";
import { riderRouter } from "../modules/rider/ride.route";


export const router = Router()

const routes= [
    {path:'/rider',
        route: riderRouter
    }
]

routes.forEach((route)=>router.use(route.path,route.route))

  