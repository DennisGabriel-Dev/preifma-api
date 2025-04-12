import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { submitAnswer } from '../controllers/simulateController.js';

const router = Router();

router.post('/answer', authMiddleware, submitAnswer);

export default router;
