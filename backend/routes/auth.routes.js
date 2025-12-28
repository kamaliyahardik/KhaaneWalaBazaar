import express from 'express';
import { signIn, signOut, signUp, sendResetOtp } from '../controllers/auth.controllers.js';


const authRouter= express.Router();

authRouter.post('/signup',signUp);
authRouter.post('/signin',signIn)
authRouter.get('/signout',signOut)
authRouter.post('/send-otp', sendOtp)
authRouter.post('/verify-otp', virifyOtp)
authRouter.post('/reset-password', resetPassword)


export default authRouter;
