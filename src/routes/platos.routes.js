// src/routes/platos.routes.js
import { Router } from 'express';
import {
    getPlatosByPais,
    getPlatoById,
    createPlato,
    updatePlato,
    deletePlato
} from '../controllers/platos.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/platos? id_pais_origen={id}
 *   GET /api/v1/platos/:id_plato
 *
 * Rutas protegidas (solo admin):
 *   POST    /api/v1/platos
 *   PUT     /api/v1/platos/:id_plato
 *   DELETE  /api/v1/platos/:id_plato
 */
router.get('/', getPlatosByPais);
router.get('/:id_plato', getPlatoById);

router.post('/', verifyToken, checkRole('administrador'), createPlato);
router.put('/:id_plato', verifyToken, checkRole('administrador'), updatePlato);
router.delete('/:id_plato', verifyToken, checkRole('administrador'), deletePlato);

export default router;
