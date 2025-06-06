// src/models/tag.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Tag = sequelize.define('Tag', {
    id_tag: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_tag: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion_tag: {
        type: DataTypes.STRING(200)
    },
    color_hex: {
        type: DataTypes.STRING(7),
        defaultValue: '#000000'
    },
    categoria: {
        type: DataTypes.ENUM('ubicacion', 'tipo', 'caracteristica', 'temporada', 'otro'),
        defaultValue: 'otro'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'TAGS',
    timestamps: false,
    indexes: [
        { fields: ['nombre_tag'], name: 'idx_nombre_tag' },
        { fields: ['categoria'], name: 'idx_categoria' }
    ]
});

export default Tag;
