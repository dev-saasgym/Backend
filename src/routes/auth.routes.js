import express from 'express';
import { registrar, login, hash } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.post('/hash', hash);

export default router;
