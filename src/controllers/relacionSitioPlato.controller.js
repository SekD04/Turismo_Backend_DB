// src/controllers/relacionSitioPlato.controller.js
import RelacionSitioPlato from '../models/relacion_sitio_plato.model.js';
import Sitio from '../models/sitio.model.js';
import Plato from '../models/plato.model.js';

export const getRelacionesBySitio = async (req, res) => {
    try {
        const { id_sitio } = req.query;
        if (!id_sitio) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_sitio como parámetro de consulta' });
        }
        const relaciones = await RelacionSitioPlato.findAll({
            where: { id_sitio },
            include: [
                { model: Sitio, as: 'sitio', attributes: ['id_sitio', 'nombre_sitio'] },
                { model: Plato, as: 'platosRelacionados', attributes: ['id_plato', 'nombre_plato'] }
            ]
        });
        return res.json({ success: true, data: relaciones, message: 'Relaciones obtenidas correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener relaciones' });
    }
};

export const getRelacionesByPlato = async (req, res) => {
    try {
        const { id_plato } = req.query;
        if (!id_plato) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_plato como parámetro de consulta' });
        }
        const relaciones = await RelacionSitioPlato.findAll({
            where: { id_plato },
            include: [
                { model: Sitio, as: 'sitio', attributes: ['id_sitio', 'nombre_sitio'] },
                { model: Plato, as: 'platosRelacionados', attributes: ['id_plato', 'nombre_plato'] }
            ]
        });
        return res.json({ success: true, data: relaciones, message: 'Relaciones obtenidas correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener relaciones' });
    }
};

export const createRelacion = async (req, res) => {
    try {
        const {
            id_sitio,
            id_plato,
            tipo_relacion,
            calidad,
            precio_promedio,
            fecha_desde,
            fecha_hasta,
            activo
        } = req.body;

        // Verificar combinación única
        const existe = await RelacionSitioPlato.findOne({ where: { id_sitio, id_plato } });
        if (existe) {
            return res.status(409).json({ success: false, message: 'La relación ya existe' });
        }
        const nuevaRelacion = await RelacionSitioPlato.create({
            id_sitio,
            id_plato,
            tipo_relacion,
            calidad,
            precio_promedio,
            fecha_desde,
            fecha_hasta,
            activo
        });
        return res.status(201).json({ success: true, data: nuevaRelacion, message: 'Relación creada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear relación' });
    }
};

export const updateRelacion = async (req, res) => {
    try {
        const { id_relacion } = req.params;
        const {
            tipo_relacion,
            calidad,
            precio_promedio,
            fecha_desde,
            fecha_hasta,
            activo
        } = req.body;
        const relacion = await RelacionSitioPlato.findByPk(id_relacion);
        if (!relacion) {
            return res.status(404).json({ success: false, message: 'Relación no encontrada' });
        }
        await relacion.update({
            tipo_relacion,
            calidad,
            precio_promedio,
            fecha_desde,
            fecha_hasta,
            activo
        });
        return res.json({ success: true, data: relacion, message: 'Relación actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar relación' });
    }
};

export const deleteRelacion = async (req, res) => {
    try {
        const { id_relacion } = req.params;
        const relacion = await RelacionSitioPlato.findByPk(id_relacion);
        if (!relacion) {
            return res.status(404).json({ success: false, message: 'Relación no encontrada' });
        }
        await relacion.destroy();
        return res.json({ success: true, message: 'Relación eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar relación' });
    }
};
