import { Router } from 'express';
import { categoriesController } from './categories.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema } from './categories.validation';

const router = Router();

router.get('/', categoriesController.list);
router.post('/', authenticate, requireRole('admin'), validate({ body: createCategorySchema }), categoriesController.create);
router.put('/:id', authenticate, requireRole('admin'), validate({ params: categoryIdParamSchema, body: updateCategorySchema }), categoriesController.update);
router.delete('/:id', authenticate, requireRole('admin'), validate({ params: categoryIdParamSchema }), categoriesController.remove);

export default router;
