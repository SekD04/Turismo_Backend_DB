// src/controllers/sitioTags.controller.js
import SitioTag from '../models/sitio_tag.model.js';
import Sitio from '../models/sitio.model.js';
import Tag from '../models/tag.model.js';
import Usuario from '../models/usuario.model.js';

export const getTagsBySitio = async (req, res) => {
    try {
        const { id_sitio } = req.query;
        if (!id_sitio) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_sitio como parámetro de consulta' });
        }
        const tags = await SitioTag.findAll({
            where: { id_sitio },
            include: [
                { model: Tag, as: 'tags', attributes: ['id_tag', 'nombre_tag', 'categoria'] },
                { model: Usuario, as: 'asignador', attributes: ['id_usuario', 'nombre_usuario'] }
            ]
        });
        return res.json({ success: true, data: tags, message: 'Tags asignados al sitio obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener tags de sitio' });
    }
};

export const assignTagToSitio = async (req, res) => {
    try {
        const { id_sitio, id_tag } = req.body;
        const asignado_por = req.usuario.id;

        // Verificar combinación única
        const existe = await SitioTag.findOne({ where: { id_sitio, id_tag } });
        if (existe) {
            return res.status(409).json({ success: false, message: 'El tag ya está asignado al sitio' });
        }
        const nuevoAsignado = await SitioTag.create({
            id_sitio,
            id_tag,
            asignado_por
        });
        return res.status(201).json({ success: true, data: nuevoAsignado, message: 'Tag asignado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al asignar tag al sitio' });
    }
};

export const removeTagFromSitio = async (req, res) => {
    try {
        const { id_sitio, id_tag } = req.params;
        const asignacion = await SitioTag.findOne({ where: { id_sitio, id_tag } });
        if (!asignacion) {
            return res.status(404).json({ success: false, message: 'No existe asignación de tag para este sitio' });
        }
        await asignacion.destroy();
        return res.json({ success: true, message: 'Tag removido del sitio correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al remover tag del sitio' });
    }
};
