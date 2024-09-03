import express from 'express';
import { createUser, getUser, updateUser, deleteUser, listUsers } from '../controllers/userController.js';
import { register, login } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/', authenticateToken, createUser);
router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.get('/', authenticateToken, listUsers);

export default router;