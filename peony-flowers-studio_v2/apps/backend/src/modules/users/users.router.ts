import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { validate } from '../../middleware/validate';
import { updateMeSchema, adminUpdateUserSchema, listUsersQuerySchema, userIdParamSchema, createStaffSchema } from './users.validation';

const router = Router();

router.use(authenticate);

router.get('/me', usersController.getMe);
router.put('/me', validate({ body: updateMeSchema }), usersController.updateMe);
router.delete('/me', usersController.deleteMe);

router.get('/', requireRole('admin'), validate({ query: listUsersQuerySchema }), usersController.list);
router.get('/:id', requireRole('admin'), validate({ params: userIdParamSchema }), usersController.getById);
router.put('/:id', requireRole('admin'), validate({ params: userIdParamSchema, body: adminUpdateUserSchema }), usersController.adminUpdate);
router.delete('/:id', requireRole('admin'), validate({ params: userIdParamSchema }), usersController.adminDelete);
router.post('/staff', requireRole('admin'), validate({ body: createStaffSchema }), usersController.createStaff);

export default router;
