// src/controllers/platos.controller.js
import Plato from '../models/plato.model.js';
import Pais from '../models/pais.model.js';

export const getPlatosByPais = async (req, res) => {
    try {
        const { id_pais_origen } = req.query;
        if (!id_pais_origen) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_pais_origen como parámetro de consulta' });
        }
        const platos = await Plato.findAll({
            where: { id_pais_origen },
            order: [['nombre_plato', 'ASC']]
        });
        return res.json({ success: true, data: platos, message: 'Platos obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener platos' });
    }
};

export const getPlatoById = async (req, res) => {
    try {
        const { id_plato } = req.params;
        const plato = await Plato.findByPk(id_plato, {
            include: [
                {
                    model: Pais,
                    as: 'paisOrigen',
                    attributes: ['id_pais', 'nombre_pais']
                }
            ]
        });
        if (!plato) {
            return res.status(404).json({ success: false, message: 'Plato no encontrado' });
        }
        return res.json({ success: true, data: plato, message: 'Plato obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener plato' });
    }
};

export const createPlato = async (req, res) => {
    try {
        const {
            nombre_plato,
            descripcion,
            cocina,
            id_pais_origen,
            tipo_plato,
            ingredientes_principales,
            tiempo_preparacion,
            dificultad,
            vegetariano,
            vegano,
            es_tipico
        } = req.body;

        // Verificar país de origen
        if (id_pais_origen) {
            const pais = await Pais.findByPk(id_pais_origen);
            if (!pais) {
                return res.status(404).json({ success: false, message: 'País de origen no existe' });
            }
        }
        const nuevoPlato = await Plato.create({
            nombre_plato,
            descripcion,
            cocina,
            id_pais_origen,
            tipo_plato,
            ingredientes_principales,
            tiempo_preparacion,
            dificultad,
            vegetariano,
            vegano,
            es_tipico
        });
        return res.status(201).json({ success: true, data: nuevoPlato, message: 'Plato creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear plato' });
    }
};

export const updatePlato = async (req, res) => {
    try {
        const { id_plato } = req.params;
        const {
            nombre_plato,
            descripcion,
            cocina,
            id_pais_origen,
            tipo_plato,
            ingredientes_principales,
            tiempo_preparacion,
            dificultad,
            vegetariano,
            vegano,
            es_tipico
        } = req.body;
        const plato = await Plato.findByPk(id_plato);
        if (!plato) {
            return res.status(404).json({ success: false, message: 'Plato no encontrado' });
        }
        if (id_pais_origen && id_pais_origen !== plato.id_pais_origen) {
            const pais = await Pais.findByPk(id_pais_origen);
            if (!pais) {
                return res.status(404).json({ success: false, message: 'País de origen no existe' });
            }
        }
        await plato.update({
            nombre_plato,
            descripcion,
            cocina,
            id_pais_origen,
            tipo_plato,
            ingredientes_principales,
            tiempo_preparacion,
            dificultad,
            vegetariano,
            vegano,
            es_tipico
        });
        return res.json({ success: true, data: plato, message: 'Plato actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar plato' });
    }
};

export const deletePlato = async (req, res) => {
    try {
        const { id_plato } = req.params;
        const plato = await Plato.findByPk(id_plato);
        if (!plato) {
            return res.status(404).json({ success: false, message: 'Plato no encontrado' });
        }
        await plato.destroy();
        return res.json({ success: true, message: 'Plato eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar plato' });
    }
};
