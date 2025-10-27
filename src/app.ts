import express from "express"
import notFound from "./app/middlewares/notFound"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar"
import cors from "cors"
import { router } from "./app/routes"
import session from "express-session"
import { envVars } from "./app/config/env"
import passport from "passport"
import './app/config/passport'
import { authRouter } from "./app/modules/auth/auth.route"
import cookieParser from "cookie-parser"

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'https://ride-booking-client.web.app', // ✅ নির্দিষ্ট করে দাও
    credentials: true, // ✅ cookies/token allow করার জন্য
  }))


app.use(session({
  secret: envVars.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/api',router)
// app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('welocome to ride booking')
})

app.use(globalErrorHandler)
app.use(notFound)