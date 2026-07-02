import { Router } from 'express';
import { wishlistController } from './wishlist.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();
router.use(authenticate);

router.get('/', wishlistController.list);
router.post('/:productId', wishlistController.add);
router.delete('/:productId', wishlistController.remove);

export default router;
