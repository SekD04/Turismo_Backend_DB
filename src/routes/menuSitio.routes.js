// src/routes/menuSitio.routes.js
import { Router } from 'express';
import {
    getMenuBySitio,
    getMenuByPlato,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuSitio.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/menuSitio? id_sitio={id}
 *   GET /api/v1/menuSitio? id_plato={id}
 *
 * Rutas protegidas (solo admin):
 *   POST   /api/v1/menuSitio
 *   PUT    /api/v1/menuSitio/:id_menu
 *   DELETE /api/v1/menuSitio/:id_menu
 */
router.get('/', getMenuBySitio);
router.get('/', getMenuByPlato); // IMPORTANTE: Si ambas query params se envían, procesar lógicamente

router.post('/', verifyToken, checkRole('administrador'), createMenuItem);
router.put('/:id_menu', verifyToken, checkRole('administrador'), updateMenuItem);
router.delete('/:id_menu', verifyToken, checkRole('administrador'), deleteMenuItem);

export default router;
