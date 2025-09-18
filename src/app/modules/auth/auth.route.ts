import { Router } from "express"
import passport from "passport"
import { authController } from "./auth.controller";


const router = Router()

// router.get('/google-login',passport.authenticate('google', { scope: ['profile', 'email'] }))

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

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication
//     res.redirect('/');
//   }

// );
export const authRouter = router
