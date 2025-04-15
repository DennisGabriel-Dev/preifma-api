import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getQuestionById, getQuestions, getResults, submitAnswer } from '../controllers/simulateController.js';

const router = Router();

router.post('/answer', authMiddleware, submitAnswer);

router.get('/questions', authMiddleware, getQuestions);

router.get('/results', authMiddleware, getResults);

router.get('/questions/:id', authMiddleware, getQuestionById);

export default router;
