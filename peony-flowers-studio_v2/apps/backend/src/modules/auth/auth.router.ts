import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { sendOtpSchema, verifyOtpSchema, refreshSchema } from './auth.validation';
import { loginRateLimiter } from '../../middleware/rateLimiter';

const router = Router();

router.post('/send-otp', validate({ body: sendOtpSchema }), authController.sendOtp);
router.post('/verify-otp', loginRateLimiter, validate({ body: verifyOtpSchema }), authController.verifyOtp);
router.post('/refresh', validate({ body: refreshSchema }), authController.refresh);
router.post('/logout', authController.logout);
router.get('/dev-otp/:phone', authController.devGetOtp);

export default router;



// import { Router } from 'express';
// import { authController } from './auth.controller';
// import { validate } from '../../middleware/validate';
// import { sendOtpSchema, verifyOtpSchema, refreshSchema } from './auth.validation';
// import { otpRateLimiter, loginRateLimiter } from '../../middleware/rateLimiter';

// const router = Router();

// router.post('/send-otp', otpRateLimiter, validate({ body: sendOtpSchema }), authController.sendOtp);
// router.post('/verify-otp', loginRateLimiter, validate({ body: verifyOtpSchema }), authController.verifyOtp);
// router.post('/refresh', validate({ body: refreshSchema }), authController.refresh);
// router.post('/logout', authController.logout);
// router.get('/dev-otp/:phone', authController.devGetOtp);

// export default router;
