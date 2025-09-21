import { Router } from "express"
import passport from "passport"
import { authController } from "./auth.controller";
import { jwtHelpers } from "../../utils/jwt";
import { setAuthCookie } from "../../utils/cookies";
import { createUserToken } from "../../utils/userToken";


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
 authController.googleCallBackUrl
);

router.post("/register",authController.createUser)

// Login route with custom callback
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Authentication error',
        error: err.message 
      });
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: info ? info.message : 'Login failed' 
      });
    }

    
    
    const userTokens = createUserToken(user);
    setAuthCookie(res, userTokens);
    res.json({})
    // req.logIn(user, (err) => {
    //   if (err) {
    //     return res.status(500).json({ 
    //       success: false, 
    //       message: 'Login session error' 
    //     });
    //   }
      
    //   return res.json({ 
    //     success: true, 
    //     message: 'Login successful',
    //     user: {
    //       id: user._id,
    //       // username: user.username,
    //       email: user.email
    //     }
    //   });
    // });
  })(req, res, next);
});


export const authRouter = router
