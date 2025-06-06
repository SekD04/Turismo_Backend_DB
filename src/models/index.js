// src/models/index.js
import sequelize from '../config/database.config.js';
import Pais from './pais.model.js';
import Ciudad from './ciudad.model.js';
import Usuario from './usuario.model.js';
import Personaje from './personaje.model.js';
import Famoso from './famoso.model.js';
import Sitio from './sitio.model.js';
import Plato from './plato.model.js';
import MenuSitio from './menu_sitio.model.js';
import Tag from './tag.model.js';
import SitioTag from './sitio_tag.model.js';
import Visita from './visita.model.js';
import RelacionSitioPlato from './relacion_sitio_plato.model.js';

// Aquí ya se han definido asociaciones en cada archivo. 
// Sin embargo, si fuese necesario, podríamos refinar asociaciones adicionales.

// (Opcional) Exportar un objeto con todos los modelos y la instancia de sequelize
const db = {
    sequelize,
    Sequelize: sequelize.Sequelize,
    Pais,
    Ciudad,
    Usuario,
    Personaje,
    Famoso,
    Sitio,
    Plato,
    MenuSitio,
    Tag,
    SitioTag,
    Visita,
    RelacionSitioPlato
};

export default db;
