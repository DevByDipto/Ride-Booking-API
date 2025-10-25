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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const rider_model_1 = require("../modules/rider/rider.model");
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../modules/user/user.model");
//custom login
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { role } = req.body;
        // const populateField = role
        const user = yield user_model_1.User.findOne({ email });
        if (!user)
            return done(null, false, { message: "User not found" });
        if (user.googleId)
            return done(null, false, { message: "This account is registered using Google Login. Please sign in with Google instead of email and password." });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return done(null, false, { message: "Incorrect password" });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// google login 
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        // Check if user already exists
        let user = yield user_model_1.User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }
        else {
            //create new rider
            const rider = yield rider_model_1.Rider.create({
                name: profile.displayName,
                email: (_b = (_a = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
            });
            // Create new user
            user = yield user_model_1.User.create({
                googleId: profile.id,
                rider: rider._id,
                name: profile.displayName,
                email: (_d = (_c = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
            });
            // await user.save();
            return done(null, user);
        }
    }
    catch (error) {
        return done(error, false);
    }
})));
// User serialization for session
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    done(null, user);
}));
