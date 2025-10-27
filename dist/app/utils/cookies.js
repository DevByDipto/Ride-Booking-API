"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    const maxAge = 1 * 24 * 60 * 60 * 1000; // days → ms
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // maxAge,
            // domain: "ride-booking-client-teal.vercel.app",
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // maxAge,
            // domain: "ride-booking-client-teal.vercel.app",
        });
    }
};
exports.setAuthCookie = setAuthCookie;
