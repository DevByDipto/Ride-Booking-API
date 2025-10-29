"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const passport_1 = __importDefault(require("passport"));
const userToken_1 = require("../../utils/userToken");
const cookies_1 = require("../../utils/cookies");
const AppError_1 = require("../../utils/AppError");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const googleCallBackUrl = (req, res, next) => {
    const redirectTo = req.query.state || '/';
    res.redirect(redirectTo);
};
const credentialLogin = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(new AppError_1.AppError("Authentication error", 500)); // line 30
        }
        // if (err) {
        //   console.log(err);
        //   return res.status(500).json({ 
        //     success: false, 
        //     message: "Authentication error"
        //   });
        // }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: info ? info.message : 'Login failed'
            });
        }
        // console.log("it's work");
        // throw new Error("made by me") // line 40
        // console.log(user);
        // console.log(user);
        const userTokens = (0, userToken_1.createUserToken)(user);
        (0, cookies_1.setAuthCookie)(res, userTokens);
        // console.log({ userTokens });
        res.json({
            success: true,
            message: "Login successful",
            data: user,
            tokens: userTokens
        });
    })(req, res, next);
};
const getNewAccessToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.headers.authorization;
    // console.log(refreshToken);
    // console.log(refreshToken);
    if (!refreshToken) {
        return next(new AppError_1.AppError("No refresh token found", 401));
    }
    const tokenInfo = yield auth_service_1.authService.getNewAccessToken(refreshToken);
    (0, cookies_1.setAuthCookie)(res, tokenInfo);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "New access token generated successfully",
        data: tokenInfo,
    });
}));
// await authService.getNewAccessToken(refreshToken)
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log();
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    //  console.log('Response headers:', res.getHeaders());
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    });
}));
// const logout = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
//   // Manual set-cookie header দিয়ে try করো
//   res.setHeader('Set-Cookie', [
//     'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
//     'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None'
//   ]);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "User Logged Out Successfully",
//     data: null,
//   });
// });
exports.AuthControllers = {
    googleCallBackUrl,
    credentialLogin,
    getNewAccessToken,
    logout
};
