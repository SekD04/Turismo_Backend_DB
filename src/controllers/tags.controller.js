// src/controllers/tags.controller.js
import Tag from '../models/tag.model.js';

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({ order: [['nombre_tag', 'ASC']] });
        return res.json({ success: true, data: tags, message: 'Tags obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener tags' });
    }
};

export const getTagById = async (req, res) => {
    try {
        const { id_tag } = req.params;
        const tag = await Tag.findByPk(id_tag);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag no encontrado' });
        }
        return res.json({ success: true, data: tag, message: 'Tag obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener tag' });
    }
};

export const createTag = async (req, res) => {
    try {
        const { nombre_tag, descripcion_tag, color_hex, categoria, activo } = req.body;
        const existe = await Tag.findOne({ where: { nombre_tag } });
        if (existe) {
            return res.status(409).json({ success: false, message: 'El nombre de tag ya existe' });
        }
        const nuevoTag = await Tag.create({
            nombre_tag,
            descripcion_tag,
            color_hex,
            categoria,
            activo
        });
        return res.status(201).json({ success: true, data: nuevoTag, message: 'Tag creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear tag' });
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id_tag } = req.params;
        const { nombre_tag, descripcion_tag, color_hex, categoria, activo } = req.body;
        const tag = await Tag.findByPk(id_tag);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag no encontrado' });
        }
        if (nombre_tag && nombre_tag !== tag.nombre_tag) {
            const existe = await Tag.findOne({ where: { nombre_tag } });
            if (existe) {
                return res.status(409).json({ success: false, message: 'El nombre de tag ya existe' });
            }
        }
        await tag.update({ nombre_tag, descripcion_tag, color_hex, categoria, activo });
        return res.json({ success: true, data: tag, message: 'Tag actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar tag' });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id_tag } = req.params;
        const tag = await Tag.findByPk(id_tag);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag no encontrado' });
        }
        await tag.destroy();
        return res.json({ success: true, message: 'Tag eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar tag' });
    }
};
