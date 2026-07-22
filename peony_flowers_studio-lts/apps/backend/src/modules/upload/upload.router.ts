import { Router } from 'express';
import multer from 'multer';
import { uploadController } from './upload.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.get('/file/*', uploadController.getImage);

router.use(authenticate, requireRole('admin', 'florist'));

router.post('/image', upload.single('file'), uploadController.uploadImage);
router.delete('/image', uploadController.deleteImage);

export default router;