// src/controllers/visitas.controller.js
import Visita from '../models/visita.model.js';
import Sitio from '../models/sitio.model.js';

export const getVisitasByUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        if (!id_usuario) {
            return res.status(400).json({ success: false, message: 'Debe indicar id_usuario como parámetro de consulta' });
        }
        const visitas = await Visita.findAll({
            where: { id_usuario },
            include: [
                { model: Sitio, as: 'sitio', attributes: ['id_sitio', 'nombre_sitio', 'id_ciudad'] }
            ],
            order: [['fecha_visita', 'DESC'], ['hora_visita', 'DESC']]
        });
        return res.json({ success: true, data: visitas, message: 'Visitas obtenidas correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener visitas' });
    }
};

export const createVisita = async (req, res) => {
    try {
        const { id_sitio, fecha_visita, hora_visita, calificacion, comentario, recomendaria, tiempo_permanencia, clima, acompañantes, gasto_aproximado } = req.body;
        const id_usuario = req.usuario.id;

        // Verificar que el sitio exista
        const sitio = await Sitio.findByPk(id_sitio);
        if (!sitio) {
            return res.status(404).json({ success: false, message: 'Sitio no existe' });
        }

        const nuevaVisita = await Visita.create({
            id_usuario,
            id_sitio,
            fecha_visita,
            hora_visita,
            calificacion,
            comentario,
            recomendaria,
            tiempo_permanencia,
            clima,
            acompañantes,
            gasto_aproximado
        });
        return res.status(201).json({ success: true, data: nuevaVisita, message: 'Visita registrada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al registrar visita' });
    }
};

export const deleteVisita = async (req, res) => {
    try {
        const { id_visita } = req.params;
        const visita = await Visita.findByPk(id_visita);
        if (!visita) {
            return res.status(404).json({ success: false, message: 'Visita no encontrada' });
        }
        // Opcional: solo el propio usuario o admin puede eliminar
        if (visita.id_usuario !== req.usuario.id && req.usuario.rol !== 'administrador') {
            return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar esta visita' });
        }
        await visita.destroy();
        return res.json({ success: true, message: 'Visita eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar visita' });
    }
};
