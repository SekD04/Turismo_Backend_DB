// src/controllers/menuSitio.controller.js
import MenuSitio from '../models/menu_sitio.model.js';
import Sitio from '../models/sitio.model.js';
import Plato from '../models/plato.model.js';

export const getMenuBySitio = async (req, res) => {
    try {
        const { id_sitio } = req.query;
        if (!id_sitio) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_sitio como parámetro de consulta' });
        }
        const menu = await MenuSitio.findAll({
            where: { id_sitio },
            include: [
                {
                    model: Plato,
                    as: 'platosDisponibles',
                    attributes: ['id_plato', 'nombre_plato']
                },
                {
                    model: Sitio,
                    as: 'sitio',
                    attributes: ['id_sitio', 'nombre_sitio']
                }
            ]
        });
        return res.json({ success: true, data: menu, message: 'Menú obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener menú' });
    }
};

export const getMenuByPlato = async (req, res) => {
    try {
        const { id_plato } = req.query;
        if (!id_plato) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_plato como parámetro de consulta' });
        }
        const menu = await MenuSitio.findAll({
            where: { id_plato },
            include: [
                {
                    model: Plato,
                    as: 'platosDisponibles',
                    attributes: ['id_plato', 'nombre_plato']
                },
                {
                    model: Sitio,
                    as: 'sitio',
                    attributes: ['id_sitio', 'nombre_sitio']
                }
            ]
        });
        return res.json({ success: true, data: menu, message: 'Menú obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener menú' });
    }
};

export const createMenuItem = async (req, res) => {
    try {
        const {
            id_sitio,
            id_plato,
            precio_plato,
            disponible,
            es_especialidad,
            fecha_inicio_disponibilidad,
            fecha_fin_disponibilidad
        } = req.body;
        // Verificar que no exista ya la combinación
        const existe = await MenuSitio.findOne({ where: { id_sitio, id_plato } });
        if (existe) {
            return res.status(409).json({ success: false, message: 'El plato ya está en el menú de este sitio' });
        }
        const nuevoMenu = await MenuSitio.create({
            id_sitio,
            id_plato,
            precio_plato,
            disponible,
            es_especialidad,
            fecha_inicio_disponibilidad,
            fecha_fin_disponibilidad
        });
        return res.status(201).json({ success: true, data: nuevoMenu, message: 'Elemento de menú creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear elemento de menú' });
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const { id_menu } = req.params;
        const {
            precio_plato,
            disponible,
            es_especialidad,
            fecha_inicio_disponibilidad,
            fecha_fin_disponibilidad
        } = req.body;
        const menuItem = await MenuSitio.findByPk(id_menu);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Elemento de menú no encontrado' });
        }
        await menuItem.update({
            precio_plato,
            disponible,
            es_especialidad,
            fecha_inicio_disponibilidad,
            fecha_fin_disponibilidad
        });
        return res.json({ success: true, data: menuItem, message: 'Elemento de menú actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar elemento de menú' });
    }
};

export const deleteMenuItem = async (req, res) => {
    try {
        const { id_menu } = req.params;
        const menuItem = await MenuSitio.findByPk(id_menu);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Elemento de menú no encontrado' });
        }
        await menuItem.destroy();
        return res.json({ success: true, message: 'Elemento de menú eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar elemento de menú' });
    }
};
