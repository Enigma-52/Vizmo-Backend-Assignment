import express from 'express';
import { signUp, logIn, getCurrentUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/user', authMiddleware, getCurrentUser);

export default router;
