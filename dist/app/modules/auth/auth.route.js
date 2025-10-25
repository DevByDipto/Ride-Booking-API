"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.get('/google-login', (req, res, next) => {
    const redirectTo = req.query.redirect || '/';
    passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
        state: redirectTo
    })(req, res, next);
});
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), auth_controller_1.AuthControllers.googleCallBackUrl);
// Login route with custom callback
router.post('/login', auth_controller_1.AuthControllers.credentialLogin);
router.post("/refresh-token", auth_controller_1.AuthControllers.getNewAccessToken);
router.post('/logout', auth_controller_1.AuthControllers.logout);
exports.authRouter = router;
