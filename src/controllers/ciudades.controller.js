// src/controllers/ciudades.controller.js
import Ciudad from '../models/ciudad.model.js';
import Pais from '../models/pais.model.js';

export const getCiudadesByPais = async (req, res) => {
    try {
        const { id_pais } = req.query;
        if (!id_pais) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_pais como parámetro de consulta' });
        }
        const ciudades = await Ciudad.findAll({
            where: { id_pais },
            order: [['nombre_ciudad', 'ASC']]
        });
        return res.json({ success: true, data: ciudades, message: 'Ciudades obtenidas correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener ciudades' });
    }
};

export const getCiudadById = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const ciudad = await Ciudad.findByPk(id_ciudad, {
            include: [{ model: Pais, as: 'pais', attributes: ['id_pais', 'nombre_pais'] }]
        });
        if (!ciudad) {
            return res.status(404).json({ success: false, message: 'Ciudad no encontrada' });
        }
        return res.json({ success: true, data: ciudad, message: 'Ciudad obtenida correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener ciudad' });
    }
};

export const createCiudad = async (req, res) => {
    try {
        const {
            nombre_ciudad,
            id_pais,
            poblacion,
            codigo_postal,
            es_capital,
            latitud,
            longitud,
            coordenadas_decimales
        } = req.body;
        // Verificar que el país existe
        const pais = await Pais.findByPk(id_pais);
        if (!pais) {
            return res.status(404).json({ success: false, message: 'País no existe' });
        }
        // Crear ciudad
        const nuevaCiudad = await Ciudad.create({
            nombre_ciudad,
            id_pais,
            poblacion,
            codigo_postal,
            es_capital,
            latitud,
            longitud,
            coordenadas_decimales
        });
        return res.status(201).json({ success: true, data: nuevaCiudad, message: 'Ciudad creada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al crear ciudad' });
    }
};

export const updateCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const {
            nombre_ciudad,
            id_pais,
            poblacion,
            codigo_postal,
            es_capital,
            latitud,
            longitud,
            coordenadas_decimales
        } = req.body;
        const ciudad = await Ciudad.findByPk(id_ciudad);
        if (!ciudad) {
            return res.status(404).json({ success: false, message: 'Ciudad no encontrada' });
        }
        // Si cambian id_pais, verificar que existe
        if (id_pais && id_pais !== ciudad.id_pais) {
            const pais = await Pais.findByPk(id_pais);
            if (!pais) {
                return res.status(404).json({ success: false, message: 'País no existe' });
            }
        }
        // Actualizar
        await ciudad.update({
            nombre_ciudad,
            id_pais,
            poblacion,
            codigo_postal,
            es_capital,
            latitud,
            longitud,
            coordenadas_decimales
        });
        return res.json({ success: true, data: ciudad, message: 'Ciudad actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar ciudad' });
    }
};

export const deleteCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const ciudad = await Ciudad.findByPk(id_ciudad);
        if (!ciudad) {
            return res.status(404).json({ success: false, message: 'Ciudad no encontrada' });
        }
        await ciudad.destroy();
        return res.json({ success: true, message: 'Ciudad eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar ciudad' });
    }
};
