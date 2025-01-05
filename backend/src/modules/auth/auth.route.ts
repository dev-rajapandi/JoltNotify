import { Router } from 'express';
import { registerUserController } from './auth.controller';

const router = Router();

router.post('/register', registerUserController);

export default router;
