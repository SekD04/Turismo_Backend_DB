// backend/src/routes/personajeTag.routes.js

import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { crearTag, getTagsUsuario } from '../controllers/personajeTag.controller.js';

const router = Router();

// Ruta protegida: crea una etiqueta de personaje
router.post('/tags', verifyToken, crearTag);

// Ruta protegida: obtiene todas las etiquetas del usuario
router.get('/tags', verifyToken, getTagsUsuario);

export default router;
