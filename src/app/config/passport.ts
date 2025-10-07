import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20"
import { envVars } from "./env";
import { Rider } from "../modules/rider/rider.model";
import { IRider } from "../modules/rider/rider.interface";
import mongoose, { CallbackError } from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../modules/user/user.model";

//custom login
passport.use(new LocalStrategy({ usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });
      if (user.googleId) return done(null, false, { message: "This account is registered using Google Login. Please sign in with Google instead of email and password." });

      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));



// google login 
passport.use(new GoogleStrategy({
  clientID: envVars.GOOGLE_CLIENT_ID,
  clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
},
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      } else {

        //create new rider
       const rider =await Rider.create({
          name: profile.displayName,
          email: profile?.emails?.[0]?.value,
        });
        // Create new user
        user = await User.create({
          googleId: profile.id,
          rider: rider._id,
          name: profile.displayName,
          email: profile?.emails?.[0]?.value,
        });



        // await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, false);
    }
  }
));

// User serialization for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});