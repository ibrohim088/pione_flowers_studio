import { Router } from 'express';
import { couponsController } from './coupons.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { applyCouponSchema, createCouponSchema, couponIdParamSchema } from './coupons.validation';

const router = Router();

router.post('/apply', authenticate, validate({ body: applyCouponSchema }), couponsController.apply);
router.get('/', authenticate, requireRole('admin'), couponsController.list);
router.post('/', authenticate, requireRole('admin'), validate({ body: createCouponSchema }), couponsController.create);
router.delete('/:id', authenticate, requireRole('admin'), validate({ params: couponIdParamSchema }), couponsController.remove);

export default router;
