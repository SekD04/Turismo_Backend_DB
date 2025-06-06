// src/routes/usuarios.routes.js
import { Router } from 'express';
import {
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    createAdministrador
} from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

// Ruta para crear administradores (solo admin)
router.post(
    '/',
    verifyToken,
    checkRole('administrador'),
    createAdministrador
);

/**
 * Rutas protegidas (solo administrador)
 *   GET    /api/v1/usuarios
 *   GET    /api/v1/usuarios/:id_usuario
 *   PUT    /api/v1/usuarios/:id_usuario
 *   DELETE /api/v1/usuarios/:id_usuario
 */
router.get('/', verifyToken, checkRole('administrador'), getAllUsuarios);
router.get('/:id_usuario', verifyToken, checkRole('administrador'), getUsuarioById);
router.put('/:id_usuario', verifyToken, checkRole('administrador'), updateUsuario);
router.delete('/:id_usuario', verifyToken, checkRole('administrador'), deleteUsuario);

export default router;
