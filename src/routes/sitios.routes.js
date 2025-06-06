// src/routes/sitios.routes.js
import { Router } from 'express';
import {
    getSitiosByCiudad,
    getSitioById,
    createSitio,
    updateSitio,
    deleteSitio
} from '../controllers/sitios.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/sitios? id_ciudad={id}
 *   GET /api/v1/sitios/:id_sitio
 *
 * Rutas protegidas (solo admin):
 *   POST   /api/v1/sitios
 *   PUT    /api/v1/sitios/:id_sitio
 *   DELETE /api/v1/sitios/:id_sitio
 */
router.get('/', getSitiosByCiudad);
router.get('/:id_sitio', getSitioById);

router.post('/', verifyToken, checkRole('administrador'), createSitio);
router.put('/:id_sitio', verifyToken, checkRole('administrador'), updateSitio);
router.delete('/:id_sitio', verifyToken, checkRole('administrador'), deleteSitio);

export default router;
