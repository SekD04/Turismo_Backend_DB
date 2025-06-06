// src/routes/ciudades.routes.js
import { Router } from 'express';
import {
    getCiudadesByPais,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad
} from '../controllers/ciudades.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/ciudades? id_pais={id}
 *   GET /api/v1/ciudades/:id_ciudad
 *
 * Rutas protegidas (solo admin):
 *   POST /api/v1/ciudades
 *   PUT /api/v1/ciudades/:id_ciudad
 *   DELETE /api/v1/ciudades/:id_ciudad
 */
router.get('/', getCiudadesByPais);
router.get('/:id_ciudad', getCiudadById);

router.post('/', verifyToken, checkRole('administrador'), createCiudad);
router.put('/:id_ciudad', verifyToken, checkRole('administrador'), updateCiudad);
router.delete('/:id_ciudad', verifyToken, checkRole('administrador'), deleteCiudad);

export default router;
