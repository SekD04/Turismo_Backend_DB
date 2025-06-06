// src/controllers/famosos.controller.js
import Famoso from '../models/famoso.model.js';
import Personaje from '../models/personaje.model.js';

export const getAllFamosos = async (req, res) => {
    try {
        const famosos = await Famoso.findAll({
            include: [
                {
                    model: Personaje,
                    as: 'personaje',
                    attributes: ['id_personaje', 'nombre_personaje', 'apellido_personaje', 'tipo', 'profesion']
                }
            ],
            order: [['id_famoso', 'ASC']]
        });
        return res.json({ success: true, data: famosos, message: 'Famosos obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener famosos' });
    }
};

export const getFamosoById = async (req, res) => {
    try {
        const { id_famoso } = req.params;
        const famoso = await Famoso.findByPk(id_famoso, {
            include: [
                {
                    model: Personaje,
                    as: 'personaje',
                    attributes: ['id_personaje', 'nombre_personaje', 'apellido_personaje', 'tipo', 'profesion']
                }
            ]
        });
        if (!famoso) {
            return res.status(404).json({ success: false, message: 'Famoso no encontrado' });
        }
        return res.json({ success: true, data: famoso, message: 'Famoso obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener famoso' });
    }
};

export const createFamoso = async (req, res) => {
    try {
        const {
            id_personaje,
            tipo_fama,
            nivel_fama,
            descripcion_fama,
            fecha_inicio_fama,
            lugar_fama
        } = req.body;
        // Verificar que el personaje exista
        const personaje = await Personaje.findByPk(id_personaje);
        if (!personaje) {
            return res.status(404).json({ success: false, message: 'Personaje no existe' });
        }
        const nuevoFamoso = await Famoso.create({
            id_personaje,
            tipo_fama,
            nivel_fama,
            descripcion_fama,
            fecha_inicio_fama,
            lugar_fama
        });
        return res.status(201).json({ success: true, data: nuevoFamoso, message: 'Famoso creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear famoso' });
    }
};

export const updateFamoso = async (req, res) => {
    try {
        const { id_famoso } = req.params;
        const {
            id_personaje,
            tipo_fama,
            nivel_fama,
            descripcion_fama,
            fecha_inicio_fama,
            lugar_fama
        } = req.body;
        const famoso = await Famoso.findByPk(id_famoso);
        if (!famoso) {
            return res.status(404).json({ success: false, message: 'Famoso no encontrado' });
        }
        if (id_personaje && id_personaje !== famoso.id_personaje) {
            const personaje = await Personaje.findByPk(id_personaje);
            if (!personaje) {
                return res.status(404).json({ success: false, message: 'Personaje no existe' });
            }
        }
        await famoso.update({
            id_personaje,
            tipo_fama,
            nivel_fama,
            descripcion_fama,
            fecha_inicio_fama,
            lugar_fama
        });
        return res.json({ success: true, data: famoso, message: 'Famoso actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar famoso' });
    }
};

export const deleteFamoso = async (req, res) => {
    try {
        const { id_famoso } = req.params;
        const famoso = await Famoso.findByPk(id_famoso);
        if (!famoso) {
            return res.status(404).json({ success: false, message: 'Famoso no encontrado' });
        }
        await famoso.destroy();
        return res.json({ success: true, message: 'Famoso eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar famoso' });
    }
};
