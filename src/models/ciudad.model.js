// src/models/ciudad.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Pais from './pais.model.js';

const Ciudad = sequelize.define('Ciudad', {
    id_ciudad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_pais: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pais,
            key: 'id_pais'
        }
    },
    poblacion: {
        type: DataTypes.STRING(20)
    },
    codigo_postal: {
        type: DataTypes.STRING(20)
    },
    es_capital: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    latitud: {
        type: DataTypes.STRING(30)
    },
    longitud: {
        type: DataTypes.STRING(30)
    },
    coordenadas_decimales: {
        type: DataTypes.STRING(50)
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'CIUDADES',
    timestamps: false,
    indexes: [
        { fields: ['id_pais'], name: 'idx_pais' },
        { fields: ['nombre_ciudad'], name: 'idx_nombre_ciudad' }
    ]
});

// Asociación a Pais (1:N)
Pais.hasMany(Ciudad, { foreignKey: 'id_pais', as: 'ciudades' });
Ciudad.belongsTo(Pais, { foreignKey: 'id_pais', as: 'pais' });

export default Ciudad;
