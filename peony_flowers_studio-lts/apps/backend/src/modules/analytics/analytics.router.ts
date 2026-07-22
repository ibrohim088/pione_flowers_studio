import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';

const router = Router();
router.use(authenticate, requireRole('admin'));

router.get('/dashboard', analyticsController.dashboard);
router.get('/overview', analyticsController.overview);
router.get('/revenue', analyticsController.revenue);
router.get('/orders', analyticsController.orders);
router.get('/products', analyticsController.products);
router.get('/users', analyticsController.users);

export default router;
