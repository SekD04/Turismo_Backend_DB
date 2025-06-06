// src/models/plato.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Pais from './pais.model.js';

const Plato = sequelize.define('Plato', {
    id_plato: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_plato: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    cocina: {
        type: DataTypes.STRING(50)
    },
    id_pais_origen: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Pais,
            key: 'id_pais'
        }
    },
    tipo_plato: {
        type: DataTypes.ENUM('entrada', 'plato_principal', 'postre', 'bebida', 'aperitivo'),
        defaultValue: 'plato_principal'
    },
    ingredientes_principales: {
        type: DataTypes.TEXT
    },
    tiempo_preparacion: {
        type: DataTypes.INTEGER // en minutos
    },
    dificultad: {
        type: DataTypes.ENUM('facil', 'medio', 'dificil'),
        defaultValue: 'medio'
    },
    vegetariano: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vegano: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    es_tipico: {
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
    tableName: 'PLATOS',
    timestamps: false,
    indexes: [
        { fields: ['id_pais_origen'], name: 'idx_pais_origen' },
        { fields: ['tipo_plato'], name: 'idx_tipo_plato' },
        { fields: ['nombre_plato'], name: 'idx_nombre_plato' },
        { fields: ['cocina'], name: 'idx_cocina' }
    ]
});

// Asociación (N:1) con País (origen)
Pais.hasMany(Plato, { foreignKey: 'id_pais_origen', as: 'platos' });
Plato.belongsTo(Pais, { foreignKey: 'id_pais_origen', as: 'paisOrigen' });

export default Plato;
