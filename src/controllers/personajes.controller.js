// src/controllers/personajes.controller.js
import Personaje from '../models/personaje.model.js';
import Ciudad from '../models/ciudad.model.js';

export const getAllPersonajes = async (req, res) => {
    try {
        const personajes = await Personaje.findAll({
            include: [{ model: Ciudad, as: 'ciudadNacimiento', attributes: ['id_ciudad', 'nombre_ciudad'] }],
            order: [['nombre_personaje', 'ASC']]
        });
        return res.json({ success: true, data: personajes, message: 'Personajes obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener personajes' });
    }
};

export const getPersonajeById = async (req, res) => {
    try {
        const { id_personaje } = req.params;
        const personaje = await Personaje.findByPk(id_personaje, {
            include: [{ model: Ciudad, as: 'ciudadNacimiento', attributes: ['id_ciudad', 'nombre_ciudad'] }]
        });
        if (!personaje) {
            return res.status(404).json({ success: false, message: 'Personaje no encontrado' });
        }
        return res.json({ success: true, data: personaje, message: 'Personaje obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener personaje' });
    }
};

export const createPersonaje = async (req, res) => {
    try {
        const {
            nombre_personaje,
            apellido_personaje,
            tipo,
            profesion,
            fecha_nacimiento,         // string flexible
            fecha_nacimiento_date,    // fecha en formato YYYY-MM-DD
            fecha_fallecimiento,      // fecha en formato YYYY-MM-DD
            id_ciudad_nacimiento,
            biografia
        } = req.body;
        // Verificar que la ciudad exista (si proporcionan un ID)
        if (id_ciudad_nacimiento) {
            const ciudad = await Ciudad.findByPk(id_ciudad_nacimiento);
            if (!ciudad) {
                return res.status(404).json({ success: false, message: 'Ciudad de nacimiento no existe' });
            }
        }
        const nuevoPersonaje = await Personaje.create({
            nombre_personaje,
            apellido_personaje,
            tipo,
            profesion,
            fecha_nacimiento,
            fecha_nacimiento_date,
            fecha_fallecimiento,
            id_ciudad_nacimiento,
            biografia
        });
        return res.status(201).json({ success: true, data: nuevoPersonaje, message: 'Personaje creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear personaje' });
    }
};

export const updatePersonaje = async (req, res) => {
    try {
        const { id_personaje } = req.params;
        const {
            nombre_personaje,
            apellido_personaje,
            tipo,
            profesion,
            fecha_nacimiento,
            fecha_nacimiento_date,
            fecha_fallecimiento,
            id_ciudad_nacimiento,
            biografia
        } = req.body;
        const personaje = await Personaje.findByPk(id_personaje);
        if (!personaje) {
            return res.status(404).json({ success: false, message: 'Personaje no encontrado' });
        }
        if (id_ciudad_nacimiento && id_ciudad_nacimiento !== personaje.id_ciudad_nacimiento) {
            const ciudad = await Ciudad.findByPk(id_ciudad_nacimiento);
            if (!ciudad) {
                return res.status(404).json({ success: false, message: 'Ciudad de nacimiento no existe' });
            }
        }
        await personaje.update({
            nombre_personaje,
            apellido_personaje,
            tipo,
            profesion,
            fecha_nacimiento,
            fecha_nacimiento_date,
            fecha_fallecimiento,
            id_ciudad_nacimiento,
            biografia
        });
        return res.json({ success: true, data: personaje, message: 'Personaje actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar personaje' });
    }
};

export const deletePersonaje = async (req, res) => {
    try {
        const { id_personaje } = req.params;
        const personaje = await Personaje.findByPk(id_personaje);
        if (!personaje) {
            return res.status(404).json({ success: false, message: 'Personaje no encontrado' });
        }
        await personaje.destroy();
        return res.json({ success: true, message: 'Personaje eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar personaje' });
    }
};
