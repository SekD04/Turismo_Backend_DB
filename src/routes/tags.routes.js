// src/routes/tags.routes.js
import { Router } from 'express';
import {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from '../controllers/tags.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/roles.middleware.js';

const router = Router();

/**
 * Rutas públicas:
 *   GET /api/v1/tags
 *   GET /api/v1/tags/:id_tag
 *
 * Rutas protegidas (solo admin):
 *   POST   /api/v1/tags
 *   PUT    /api/v1/tags/:id_tag
 *   DELETE /api/v1/tags/:id_tag
 */
router.get('/', getAllTags);
router.get('/:id_tag', getTagById);

router.post('/', verifyToken, checkRole('administrador'), createTag);
router.put('/:id_tag', verifyToken, checkRole('administrador'), updateTag);
router.delete('/:id_tag', verifyToken, checkRole('administrador'), deleteTag);

export default router;
