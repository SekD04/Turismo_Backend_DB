// src/models/sitio_tag.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Sitio from './sitio.model.js';
import Tag from './tag.model.js';
import Usuario from './usuario.model.js';

const SitioTag = sequelize.define('SitioTag', {
    id_sitio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Sitio,
            key: 'id_sitio'
        }
    },
    id_tag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Tag,
            key: 'id_tag'
        }
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    asignado_por: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    }
}, {
    tableName: 'SITIO_TAGS',
    timestamps: false,
    indexes: [
        { fields: ['fecha_asignacion'], name: 'idx_fecha_asignacion' }
    ]
});

// Asociación N:M entre Sitio y Tag a través de SitioTag
Sitio.belongsToMany(Tag, {
    through: SitioTag,
    foreignKey: 'id_sitio',
    otherKey: 'id_tag',
    as: 'tags'
});
Tag.belongsToMany(Sitio, {
    through: SitioTag,
    foreignKey: 'id_tag',
    otherKey: 'id_sitio',
    as: 'sitios'
});

// Asociación de quien asigna el tag
Usuario.hasMany(SitioTag, { foreignKey: 'asignado_por', as: 'tagsAsignados' });
SitioTag.belongsTo(Usuario, { foreignKey: 'asignado_por', as: 'asignador' });

export default SitioTag;
