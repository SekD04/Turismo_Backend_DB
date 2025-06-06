// src/models/sitio.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Ciudad from './ciudad.model.js';

const Sitio = sequelize.define('Sitio', {
    id_sitio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_sitio: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ciudad,
            key: 'id_ciudad'
        }
    },
    direccion: {
        type: DataTypes.STRING(200)
    },
    tipo: {
        type: DataTypes.STRING(50)
    },
    tipo_categoria: {
        type: DataTypes.ENUM('historico', 'natural', 'cultural', 'religioso', 'recreativo', 'gastronomico', 'otro'),
        defaultValue: 'otro'
    },
    estilo: {
        type: DataTypes.STRING(100)
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
    precio_entrada: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    horario_apertura: {
        type: DataTypes.TIME
    },
    horario_cierre: {
        type: DataTypes.TIME
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: 'SITIOS',
    timestamps: false,
    indexes: [
        { fields: ['id_ciudad'], name: 'idx_ciudad' },
        { fields: ['tipo'], name: 'idx_tipo' },
        { fields: ['tipo_categoria'], name: 'idx_tipo_categoria' },
        { fields: ['nombre_sitio'], name: 'idx_nombre_sitio' }
    ]
});

// Asociación (N:1) con Ciudad
Ciudad.hasMany(Sitio, { foreignKey: 'id_ciudad', as: 'sitios' });
Sitio.belongsTo(Ciudad, { foreignKey: 'id_ciudad', as: 'ciudad' });

export default Sitio;
