import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20"
import { envVars } from "./env";
import { Rider } from "../modules/rider/rider.model";
import { IRider } from "../modules/rider/rider.interface";
import mongoose from "mongoose";

//custom login


// google login 
passport.use(new GoogleStrategy({
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
},
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => { // ai j profile type,verifycallback type gulo ache seta janbo kivabe ??(support)
        try {
            // Check if user already exists
            let rider = await Rider.findOne({ googleId: profile.id });

            if (rider) {
                return done(null, rider);
            } else {
                // Create new user
                rider = new Rider({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile?.emails?.[0]?.value, // ts error e ai theke o solution nah paile koroniyo kii ??(support)
                    photo: profile.photos?.[0].value
                });

                await rider.save();
                return done(null, rider);
            }
        } catch (error) {
            return done(error, false);
        }
    }
));

// User serialization for session
passport.serializeUser((rider, done) => { // video te aikhane type any use korse akhon ami bujbo kivabe j aikhane type any use korte hobe ?(support)
  const r = rider as IRider;  
  console.log(r.googleId);
  done(null, r);  
});

passport.deserializeUser(async(googleId, done) => {
    const rider = await Rider.findById({googleId}); // session এ থাকা _id ব্যবহার
  done(null, rider); // req.user এ attach হবে

});