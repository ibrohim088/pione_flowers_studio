import { Router } from 'express';
import { paymentsController } from './payments.controller';
import { handleClickWebhook } from './payments.webhook';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { clickPrepareSchema, cashActionSchema, orderIdParamSchema, refundParamSchema } from './payments.validation';

const router = Router();

// Click uchun ochiq (webhook signature orqali tasdiqlanadi)
router.post('/click/prepare', authenticate, validate({ body: clickPrepareSchema }), paymentsController.clickPrepare);
router.post('/click/complete', handleClickWebhook);

// Naqd — faqat admin
router.post('/cash/confirm', authenticate, requireRole('admin'), validate({ body: cashActionSchema }), paymentsController.cashConfirm);
router.post('/cash/reject', authenticate, requireRole('admin'), validate({ body: cashActionSchema }), paymentsController.cashReject);

router.get('/:orderId/status', authenticate, validate({ params: orderIdParamSchema }), paymentsController.getStatus);
router.get('/history', authenticate, requireRole('admin'), paymentsController.history);
router.post('/:id/refund', authenticate, requireRole('admin'), validate({ params: refundParamSchema }), paymentsController.refund);

export default router;
