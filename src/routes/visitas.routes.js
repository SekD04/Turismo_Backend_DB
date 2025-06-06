// src/routes/visitas.routes.js
import { Router } from 'express';
import {
    getVisitasByUsuario,
    createVisita,
    deleteVisita
} from '../controllers/visitas.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas protegidas (requiere JWT):
 *   GET    /api/v1/visitas? id_usuario={id}
 *   POST   /api/v1/visitas
 *   DELETE /api/v1/visitas/:id_visita
 */
router.get('/', verifyToken, getVisitasByUsuario);
router.post('/', verifyToken, createVisita);
router.delete('/:id_visita', verifyToken, deleteVisita);

export default router;
