import express from 'express';
import { criarAluno, listarAlunos } from '../controllers/alunos.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, criarAluno);
router.get('/', authMiddleware, listarAlunos);

export default router;