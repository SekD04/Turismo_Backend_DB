// src/routes/sitioTags.routes.js
import { Router } from 'express';
import {
    getTagsBySitio,
    assignTagToSitio,
    removeTagFromSitio
} from '../controllers/sitioTags.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET    /api/v1/sitioTags? id_sitio={id}
 *
 * Rutas protegidas:
 *   POST   /api/v1/sitioTags           (requiere JWT, rol admin o user según políticas)
 *   DELETE /api/v1/sitioTags/:id_sitio/:id_tag  (requiere JWT, rol admin)
 */
router.get('/', getTagsBySitio);

router.post('/', verifyToken, checkRole('administrador'), assignTagToSitio);
router.delete('/:id_sitio/:id_tag', verifyToken, checkRole('administrador'), removeTagFromSitio);

export default router;
