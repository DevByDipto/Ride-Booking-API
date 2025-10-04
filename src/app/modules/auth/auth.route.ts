import { Router } from "express"
import passport from "passport"
import { AuthControllers } from "./auth.controller";
import { jwtHelpers } from "../../utils/jwt";
import { setAuthCookie } from "../../utils/cookies";
import { createUserToken } from "../../utils/userToken";
import { validationRequest } from "../../middlewares/validateRequest";
import { UserZodSchema } from "../user/user.valodation";


const router = Router()


router.get('/google-login', (req, res, next) => {
  const redirectTo = req.query.redirect as string || '/'; 
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    state: redirectTo 
  })(req, res, next);
});

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
 AuthControllers.googleCallBackUrl
);



// Login route with custom callback
router.post('/login', AuthControllers.credentialLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post('/logout', AuthControllers.logout);


export const authRouter = router
