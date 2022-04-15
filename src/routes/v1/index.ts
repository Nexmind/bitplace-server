import { Router } from 'express'

import auth from './auth'
import users from './users'
import shops from './shops'

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/shops', shops)

export default router;
