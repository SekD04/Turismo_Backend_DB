// src/routes/relacionSitioPlato.routes.js
import { Router } from 'express';
import {
    getRelacionesBySitio,
    getRelacionesByPlato,
    createRelacion,
    updateRelacion,
    deleteRelacion
} from '../controllers/relacionSitioPlato.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/relacionSitioPlato? id_sitio={id}
 *   GET /api/v1/relacionSitioPlato? id_plato={id}
 *
 * Rutas protegidas (solo admin):
 *   POST   /api/v1/relacionSitioPlato
 *   PUT    /api/v1/relacionSitioPlato/:id_relacion
 *   DELETE /api/v1/relacionSitioPlato/:id_relacion
 */
router.get('/', getRelacionesBySitio);
router.get('/', getRelacionesByPlato);

router.post('/', verifyToken, checkRole('administrador'), createRelacion);
router.put('/:id_relacion', verifyToken, checkRole('administrador'), updateRelacion);
router.delete('/:id_relacion', verifyToken, checkRole('administrador'), deleteRelacion);

export default router;
