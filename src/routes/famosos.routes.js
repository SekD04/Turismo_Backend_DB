// src/routes/famosos.routes.js
import { Router } from 'express';
import {
    getAllFamosos,
    getFamosoById,
    createFamoso,
    updateFamoso,
    deleteFamoso
} from '../controllers/famosos.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/famosos
 *   GET /api/v1/famosos/:id_famoso
 *
 * Rutas protegidas (solo admin):
 *   POST /api/v1/famosos
 *   PUT  /api/v1/famosos/:id_famoso
 *   DELETE /api/v1/famosos/:id_famoso
 */
router.get('/', getAllFamosos);
router.get('/:id_famoso', getFamosoById);

router.post('/', verifyToken, checkRole('administrador'), createFamoso);
router.put('/:id_famoso', verifyToken, checkRole('administrador'), updateFamoso);
router.delete('/:id_famoso', verifyToken, checkRole('administrador'), deleteFamoso);

export default router;
