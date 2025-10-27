"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: '/',
            // encode: String,
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: '/',
            // encode: String,
        });
    }
};
exports.setAuthCookie = setAuthCookie;
