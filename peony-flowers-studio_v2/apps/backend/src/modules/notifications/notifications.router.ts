import { Router } from 'express';
import { z } from 'zod';
import { notificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';

const sendSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  message: z.string().min(1),
});

const router = Router();
router.use(authenticate);

router.get('/', notificationsController.list);
router.patch('/read-all', notificationsController.markAllRead);
router.patch('/:id/read', notificationsController.markRead);
router.post('/send', requireRole('admin'), validate({ body: sendSchema }), notificationsController.send);

export default router;
