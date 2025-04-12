import { Router } from 'express';
import { createQuestion } from '../controllers/questionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, createQuestion);

export default router;
