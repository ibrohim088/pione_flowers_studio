import { Router } from 'express';
import { contentController } from './content.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { upsertContentSchema, contentKeyParamSchema, contentQuerySchema } from './content.validation';

const router = Router();

// ---- Admin (avval, aniqroq path'lar) ----
router.get('/', authenticate, requireRole('admin'), contentController.list);
router.get(
  '/:key/raw',
  authenticate,
  requireRole('admin'),
  validate({ params: contentKeyParamSchema }),
  contentController.getRaw
);
router.put(
  '/:key',
  authenticate,
  requireRole('admin'),
  validate({ params: contentKeyParamSchema, body: upsertContentSchema }),
  contentController.upsert
);

// ---- Public ----
router.get(
  '/:key',
  validate({ params: contentKeyParamSchema, query: contentQuerySchema }),
  contentController.getPublic
);

export default router;
