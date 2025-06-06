// src/controllers/sitios.controller.js
import Sitio from '../models/sitio.model.js';
import Ciudad from '../models/ciudad.model.js';

export const getSitiosByCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.query;
        if (!id_ciudad) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_ciudad como parámetro de consulta' });
        }
        const sitios = await Sitio.findAll({
            where: { id_ciudad },
            order: [['nombre_sitio', 'ASC']]
        });
        return res.json({ success: true, data: sitios, message: 'Sitios obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener sitios' });
    }
};

export const getSitioById = async (req, res) => {
    try {
        const { id_sitio } = req.params;
        const sitio = await Sitio.findByPk(id_sitio, {
            include: [
                {
                    model: Ciudad,
                    as: 'ciudad',
                    attributes: ['id_ciudad', 'nombre_ciudad', 'id_pais']
                }
            ]
        });
        if (!sitio) {
            return res.status(404).json({ success: false, message: 'Sitio no encontrado' });
        }
        return res.json({ success: true, data: sitio, message: 'Sitio obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener sitio' });
    }
};

export const createSitio = async (req, res) => {
    try {
        const {
            nombre_sitio,
            descripcion,
            id_ciudad,
            direccion,
            tipo,
            tipo_categoria,
            estilo,
            latitud,
            longitud,
            coordenadas_decimales,
            precio_entrada,
            horario_apertura,
            horario_cierre,
            activo
        } = req.body;

        // Verificar que la ciudad exista
        const ciudad = await Ciudad.findByPk(id_ciudad);
        if (!ciudad) {
            return res.status(404).json({ success: false, message: 'Ciudad no existe' });
        }
        const nuevoSitio = await Sitio.create({
            nombre_sitio,
            descripcion,
            id_ciudad,
            direccion,
            tipo,
            tipo_categoria,
            estilo,
            latitud,
            longitud,
            coordenadas_decimales,
            precio_entrada,
            horario_apertura,
            horario_cierre,
            activo
        });
        return res.status(201).json({ success: true, data: nuevoSitio, message: 'Sitio creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear sitio' });
    }
};

export const updateSitio = async (req, res) => {
    try {
        const { id_sitio } = req.params;
        const {
            nombre_sitio,
            descripcion,
            id_ciudad,
            direccion,
            tipo,
            tipo_categoria,
            estilo,
            latitud,
            longitud,
            coordenadas_decimales,
            precio_entrada,
            horario_apertura,
            horario_cierre,
            activo
        } = req.body;
        const sitio = await Sitio.findByPk(id_sitio);
        if (!sitio) {
            return res.status(404).json({ success: false, message: 'Sitio no encontrado' });
        }
        if (id_ciudad && id_ciudad !== sitio.id_ciudad) {
            const ciudad = await Ciudad.findByPk(id_ciudad);
            if (!ciudad) {
                return res.status(404).json({ success: false, message: 'Ciudad no existe' });
            }
        }
        await sitio.update({
            nombre_sitio,
            descripcion,
            id_ciudad,
            direccion,
            tipo,
            tipo_categoria,
            estilo,
            latitud,
            longitud,
            coordenadas_decimales,
            precio_entrada,
            horario_apertura,
            horario_cierre,
            activo
        });
        return res.json({ success: true, data: sitio, message: 'Sitio actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar sitio' });
    }
};

export const deleteSitio = async (req, res) => {
    try {
        const { id_sitio } = req.params;
        const sitio = await Sitio.findByPk(id_sitio);
        if (!sitio) {
            return res.status(404).json({ success: false, message: 'Sitio no encontrado' });
        }
        await sitio.destroy();
        return res.json({ success: true, message: 'Sitio eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar sitio' });
    }
};
