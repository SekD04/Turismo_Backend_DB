// src/models/personajeTag.model.js
import { DataTypes } from 'sequelize';
import db from '../config/database.config.js';
import Usuario from './usuario.model.js';
import Personaje from './personaje.model.js';

const PersonajeTag = db.define('PersonajeTag', {
    id_tag: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_personaje: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
    fecha_tag: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'PERSONAJE_TAG',
    timestamps: false
});

PersonajeTag.belongsTo(Usuario, { foreignKey: 'id_usuario' });
PersonajeTag.belongsTo(Personaje, { foreignKey: 'id_personaje' });

export default PersonajeTag;
