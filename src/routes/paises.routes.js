// src/routes/paises.routes.js
import { Router } from 'express';
import {
    getAllPaises,
    getPaisById,
    createPais,
    updatePais,
    deletePais
} from '../controllers/paises.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET    /api/v1/paises
 *   GET    /api/v1/paises/:id_pais
 *
 * Rutas protegidas (sólo admin):
 *   POST   /api/v1/paises
 *   PUT    /api/v1/paises/:id_pais
 *   DELETE /api/v1/paises/:id_pais
 */
router.get('/', getAllPaises);
router.get('/:id_pais', getPaisById);

// A partir de aquí, requiere JWT y rol 'administrador'
router.post('/', verifyToken, checkRole('administrador'), createPais);
router.put('/:id_pais', verifyToken, checkRole('administrador'), updatePais);
router.delete('/:id_pais', verifyToken, checkRole('administrador'), deletePais);

export default router;
