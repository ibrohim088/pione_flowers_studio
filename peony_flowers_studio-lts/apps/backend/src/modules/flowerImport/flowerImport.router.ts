import { Router } from 'express';
import { flowerImportController } from './flowerImport.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';

const router = Router();

// Faqat admin uchun — vaqtinchalik import funksiyasi.
router.get('/search', authenticate, requireRole('admin'), flowerImportController.search);
router.get('/:externalId', authenticate, requireRole('admin'), flowerImportController.detail);

export default router;
