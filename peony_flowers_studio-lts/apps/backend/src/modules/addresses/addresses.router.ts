import { Router } from 'express';
import { addressesController } from './addresses.controller';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { createAddressSchema, updateAddressSchema, addressIdParamSchema } from './addresses.validation';

const router = Router();
router.use(authenticate);

router.get('/', addressesController.list);
router.post('/', validate({ body: createAddressSchema }), addressesController.create);
router.put('/:id', validate({ params: addressIdParamSchema, body: updateAddressSchema }), addressesController.update);
router.delete('/:id', validate({ params: addressIdParamSchema }), addressesController.remove);

export default router;
