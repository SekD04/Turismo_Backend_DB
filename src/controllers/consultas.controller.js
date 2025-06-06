// src/controllers/consultas.controller.js
import db from '../models/index.js'; // para usar sequelize.query
export const getTopSitiosPorPais = async (req, res) => {
    try {
        const { paisId, limit = 10 } = req.query;
        if (!paisId) {
            return res.status(400).json({ success: false, message: 'Debe indicar paisId' });
        }
        const query = `
      SELECT s.id_sitio, s.nombre_sitio, c.nombre_ciudad, COUNT(v.id_visita) AS total_visitas
      FROM VISITA v
      JOIN SITIOS s ON v.id_sitio = s.id_sitio
      JOIN CIUDADES c ON s.id_ciudad = c.id_ciudad
      WHERE c.id_pais = :paisId
      GROUP BY s.id_sitio, s.nombre_sitio, c.nombre_ciudad
      ORDER BY total_visitas DESC
      LIMIT :limit;
    `;
        const [results] = await db.sequelize.query(query, {
            replacements: { paisId, limit: parseInt(limit, 10) },
            type: db.sequelize.QueryTypes.SELECT
        });
        return res.json({ success: true, data: results, message: 'Top Sitios obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener Top Sitios' });
    }
};
