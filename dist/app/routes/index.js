"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ride_route_1 = require("../modules/rider/ride.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const driver_route_1 = require("../modules/driver/driver.route");
const ride_route_2 = require("../modules/ride/ride.route");
exports.router = (0, express_1.Router)();
const routes = [
    { path: '/rider',
        route: ride_route_1.riderRouter
    },
    { path: '/auth',
        route: auth_route_1.authRouter
    },
    { path: '/user',
        route: user_route_1.userRouter
    },
    { path: '/driver',
        route: driver_route_1.driverRouter
    },
    { path: '/ride',
        route: ride_route_2.rideRouter
    },
];
routes.forEach((route) => exports.router.use(route.path, route.route));
