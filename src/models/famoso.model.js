// src/models/famoso.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Personaje from './personaje.model.js';

const Famoso = sequelize.define('Famoso', {
    id_famoso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_personaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Personaje,
            key: 'id_personaje'
        }
    },
    tipo_fama: {
        type: DataTypes.ENUM('historico', 'artistico', 'cientifico', 'deportivo', 'politico', 'otro'),
        defaultValue: 'otro'
    },
    nivel_fama: {
        type: DataTypes.ENUM('local', 'nacional', 'internacional'),
        defaultValue: 'local'
    },
    descripcion_fama: {
        type: DataTypes.TEXT
    },
    fecha_inicio_fama: {
        type: DataTypes.DATEONLY
    },
    lugar_fama: {
        type: DataTypes.STRING(200)
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'FAMOSO',
    timestamps: false,
    indexes: [
        { fields: ['id_personaje'], name: 'idx_personaje' },
        { fields: ['tipo_fama'], name: 'idx_tipo_fama' },
        { fields: ['nivel_fama'], name: 'idx_nivel_fama' }
    ]
});

// Asociación 1:1 entre Personaje y Famoso
Personaje.hasOne(Famoso, { foreignKey: 'id_personaje', as: 'detallesFama' });
Famoso.belongsTo(Personaje, { foreignKey: 'id_personaje', as: 'personaje' });

export default Famoso;
