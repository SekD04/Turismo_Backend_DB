// src/models/pais.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Pais = sequelize.define('Pais', {
    id_pais: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_pais: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    codigo_pais: {
        type: DataTypes.STRING(3),
        unique: true
    },
    poblacion: {
        type: DataTypes.STRING(20) // formato texto, ej. "51,52"
    },
    continente: {
        type: DataTypes.STRING(50)
    },
    idioma_oficial: {
        type: DataTypes.STRING(50)
    },
    moneda: {
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
    tableName: 'PAISES',
    timestamps: false,
    indexes: [
        { fields: ['nombre_pais'], name: 'idx_nombre_pais' }
    ]
});

export default Pais;
