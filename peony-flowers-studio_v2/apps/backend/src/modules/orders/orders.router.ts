import { Router } from 'express';
import { ordersController } from './orders.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdParamSchema,
  preparedOrderSchema,
} from './orders.validation';

const router = Router();

router.use(authenticate);

// Mijoz
router.get('/', ordersController.listMine);
router.post('/', validate({ body: createOrderSchema }), ordersController.create);
router.get('/:id', validate({ params: orderIdParamSchema }), ordersController.getById);
router.patch('/:id/cancel', validate({ params: orderIdParamSchema }), ordersController.cancel);

// Admin
router.get('/admin/all', requireRole('admin'), ordersController.listAllForAdmin);
router.patch(
  '/:id/status',
  requireRole('admin', 'florist', 'courier'),
  validate({ params: orderIdParamSchema, body: updateOrderStatusSchema }),
  ordersController.updateStatus
);

// Florist
router.get('/florist/queue', requireRole('florist', 'admin'), ordersController.floristQueue);
router.post(
  '/:id/prepared',
  requireRole('florist', 'admin'),
  validate({ params: orderIdParamSchema, body: preparedOrderSchema }),
  ordersController.markPrepared
);

// Courier
router.get('/courier/today', requireRole('courier', 'admin'), ordersController.courierToday);
router.patch('/:id/delivered', requireRole('courier', 'admin'), validate({ params: orderIdParamSchema }), ordersController.markDelivered);

export default router;
