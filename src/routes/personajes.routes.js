// src/routes/personajes.routes.js
import { Router } from 'express';
import {
    getAllPersonajes,
    getPersonajeById,
    createPersonaje,
    updatePersonaje,
    deletePersonaje
} from '../controllers/personajes.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/personajes
 *   GET /api/v1/personajes/:id_personaje
 *
 * Rutas protegidas (solo admin):
 *   POST   /api/v1/personajes
 *   PUT    /api/v1/personajes/:id_personaje
 *   DELETE /api/v1/personajes/:id_personaje
 */
router.get('/', getAllPersonajes);
router.get('/:id_personaje', getPersonajeById);

router.post('/', verifyToken, checkRole('administrador'), createPersonaje);
router.put('/:id_personaje', verifyToken, checkRole('administrador'), updatePersonaje);
router.delete('/:id_personaje', verifyToken, checkRole('administrador'), deletePersonaje);

export default router;
