import { Router } from 'express';
import { z } from 'zod';
import { reviewsController } from './reviews.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

const router = Router();

// eslatma: bu router /products/:id/reviews va /reviews/:id sifatida server.ts'da ulanadi
router.get('/products/:id/reviews', reviewsController.listByProduct);
router.post('/products/:id/reviews', authenticate, validate({ body: createReviewSchema }), reviewsController.create);
router.delete('/reviews/:id', authenticate, requireRole('admin'), reviewsController.remove);

export default router;
