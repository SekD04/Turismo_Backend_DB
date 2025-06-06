// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Importar sequelize y modelos para sincronizar
import db from './models/index.js';

// Importar rutas existentes
import authRoutes            from './routes/auth.routes.js';
import paisesRoutes          from './routes/paises.routes.js';
import ciudadesRoutes        from './routes/ciudades.routes.js';
import usuariosRoutes        from './routes/usuarios.routes.js';
import personajesRoutes      from './routes/personajes.routes.js';
import famososRoutes         from './routes/famosos.routes.js';
import sitiosRoutes          from './routes/sitios.routes.js';
import platosRoutes          from './routes/platos.routes.js';
import menuSitioRoutes       from './routes/menuSitio.routes.js';
import tagsRoutes            from './routes/tags.routes.js';
import sitioTagsRoutes       from './routes/sitioTags.routes.js';
import visitasRoutes         from './routes/visitas.routes.js';
import relacionSitioPlatoRoutes from './routes/relacionSitioPlato.routes.js';

// IMPORTANTE: importar las rutas de “etiquetas a personajes”
import personajeTagRoutes    from './routes/personajeTag.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());            // Para parsear JSON en body
app.use(express.urlencoded({ extended: true }));

// Rutas base (v1)
app.use('/api/v1/auth',           authRoutes);
app.use('/api/v1/paises',         paisesRoutes);
app.use('/api/v1/ciudades',       ciudadesRoutes);
app.use('/api/v1/usuarios',       usuariosRoutes);
app.use('/api/v1/personajes',     personajesRoutes);
app.use('/api/v1/famosos',        famososRoutes);
app.use('/api/v1/sitios',         sitiosRoutes);
app.use('/api/v1/platos',         platosRoutes);
app.use('/api/v1/menuSitio',      menuSitioRoutes);
app.use('/api/v1/tags',           tagsRoutes);
app.use('/api/v1/sitioTags',      sitioTagsRoutes);
app.use('/api/v1/visitas',        visitasRoutes);
app.use('/api/v1/relacionSitioPlato', relacionSitioPlatoRoutes);

// --- AQUÍ montamos las rutas de “etiquetas a personajes” ---
app.use('/api/v1/personaje', personajeTagRoutes);

// Ruta de prueba simple
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API REST corriendo correctamente' });
});

// Sincronizar modelos y levantar servidor
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✔️   Conexión a la base de datos establecida.');

    // Si deseas que Sequelize cree/actualice tablas automáticamente según los modelos:
    // await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀   Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌  No fue posible conectar a la base de datos:', error);
    process.exit(1);
  }
};

startServer();
