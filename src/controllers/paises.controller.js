// src/controllers/paises.controller.js
import Pais from '../models/pais.model.js';

export const getAllPaises = async (req, res) => {
    try {
        const paises = await Pais.findAll({ order: [['nombre_pais', 'ASC']] });
        return res.json({ success: true, data: paises, message: 'Países obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener países' });
    }
};

export const getPaisById = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const pais = await Pais.findByPk(id_pais);
        if (!pais) {
            return res.status(404).json({ success: false, message: 'País no encontrado' });
        }
        return res.json({ success: true, data: pais, message: 'País obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener el país' });
    }
};

export const createPais = async (req, res) => {
    try {
        const { nombre_pais, codigo_pais, poblacion, continente, idioma_oficial, moneda } = req.body;
        const existe = await Pais.findOne({ where: { nombre_pais } });
        if (existe) {
            return res.status(409).json({ success: false, message: 'El país ya existe' });
        }
        const nuevoPais = await Pais.create({ nombre_pais, codigo_pais, poblacion, continente, idioma_oficial, moneda });
        return res.status(201).json({ success: true, data: nuevoPais, message: 'País creado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear el país' });
    }
};

export const updatePais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const { nombre_pais, codigo_pais, poblacion, continente, idioma_oficial, moneda } = req.body;
        const pais = await Pais.findByPk(id_pais);
        if (!pais) {
            return res.status(404).json({ success: false, message: 'País no encontrado' });
        }
        await pais.update({ nombre_pais, codigo_pais, poblacion, continente, idioma_oficial, moneda });
        return res.json({ success: true, data: pais, message: 'País actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar el país' });
    }
};

export const deletePais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const pais = await Pais.findByPk(id_pais);
        if (!pais) {
            return res.status(404).json({ success: false, message: 'País no encontrado' });
        }
        await pais.destroy();
        return res.json({ success: true, message: 'País eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar el país' });
    }
};
