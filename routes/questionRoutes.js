import { Router } from 'express';
import { createQuestion } from '../controllers/questionController.js';

const router = Router();

router.post('/create', createQuestion);

export default router;
