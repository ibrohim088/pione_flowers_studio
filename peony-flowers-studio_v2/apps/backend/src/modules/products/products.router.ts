import { Router } from 'express';
import { productsController } from './products.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import {
  createProductSchema,
  updateProductSchema,
  productFilterQuerySchema,
  productIdParamSchema,
  productSlugParamSchema,
} from './products.validation';

const router = Router();

router.get('/', validate({ query: productFilterQuerySchema }), productsController.list);
router.get('/:slug', validate({ params: productSlugParamSchema }), productsController.getBySlug);

router.post('/', authenticate, requireRole('admin'), validate({ body: createProductSchema }), productsController.create);
router.put('/:id', authenticate, requireRole('admin'), validate({ params: productIdParamSchema, body: updateProductSchema }), productsController.update);
router.delete('/:id', authenticate, requireRole('admin'), validate({ params: productIdParamSchema }), productsController.remove);

export default router;
