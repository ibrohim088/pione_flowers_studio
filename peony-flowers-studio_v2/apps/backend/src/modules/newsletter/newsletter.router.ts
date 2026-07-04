import { Router } from 'express';
import { newsletterController } from './newsletter.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { newsletterRateLimiter } from '../../middleware/rateLimiter';
import { subscribeSchema } from './newsletter.validation';

const router = Router();

router.post('/subscribe', newsletterRateLimiter, validate({ body: subscribeSchema }), newsletterController.subscribe);
router.get('/', authenticate, requireRole('admin'), newsletterController.list);

export default router;
