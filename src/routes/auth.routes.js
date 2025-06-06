// src/routes/auth.routes.js
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Público
 */
router.post('/register', register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Autenticar usuario y devolver JWT
 * @access  Público
 */
router.post('/login', login);

export default router;
