// backend/src/controllers/personajeTag.controller.js

import PersonajeTag from '../models/personajeTag.model.js';
import Personaje    from '../models/personaje.model.js';

//
// POST /api/personaje/tags
// Crea una nueva “etiqueta” (tag) de personaje para el usuario autenticado.
// 
export const crearTag = async (req, res) => {
  try {
    const { id_personaje, comentario, foto_url, latitud, longitud } = req.body;
    // `req.usuario.id` lo coloca el middleware verifyToken
    const id_usuario = req.usuario.id;

    // (Opcional) Verificar que el personaje exista
    // const existePersonaje = await Personaje.findByPk(id_personaje);
    // if (!existePersonaje) {
    //   return res.status(404).json({ success: false, message: 'Personaje no encontrado' });
    // }

    const nuevoTag = await PersonajeTag.create({
      id_usuario,
      id_personaje,
      comentario,
      foto_url: foto_url || null,
      latitud: latitud || null,
      longitud: longitud || null
    });

    return res.status(201).json({
      success: true,
      data: nuevoTag,
      message: 'Etiqueta de personaje creada'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al crear etiqueta' });
  }
};

//
// GET /api/personaje/tags
// Devuelve todas las etiquetas que el usuario actual haya creado
//
export const getTagsUsuario = async (req, res) => {
  try {
    const id_usuario = req.usuario.id;

    const tags = await PersonajeTag.findAll({
      where: { id_usuario },
      include: [
        {
          model: Personaje,
          attributes: ['id_personaje', 'nombre_completo']
        }
      ],
      order: [['fecha_tag', 'DESC']]
    });

    return res.json({ success: true, data: tags });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error al obtener etiquetas' });
  }
};
