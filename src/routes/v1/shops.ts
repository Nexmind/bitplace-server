import { create, list, edit, geolocation } from 'controllers/shop';
import { Router } from 'express';

import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

router.get('/', list)
router.get('/geolocation', geolocation)
router.put('/:id([0-9]+)', edit)
router.post('/', [checkJwt, checkRole(['STANDARD', 'ADMINISTRATOR'], true)], create)

export default router;
