// src/models/personaje.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Ciudad from './ciudad.model.js';

const Personaje = sequelize.define('Personaje', {
    id_personaje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_personaje: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    apellido_personaje: {
        type: DataTypes.STRING(150)
    },
    nombre_completo: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.nombre_personaje} ${this.apellido_personaje || ''}`.trim();
        }
        // Nota: si necesitas persistirlo tal cual en la BD, deberías migrar la columna generada. 
        // Este ejemplo lo devuelve dinámicamente.
    },
    tipo: {
        type: DataTypes.STRING(50)
    },
    profesion: {
        type: DataTypes.STRING(100)
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(20) // Fecha flexible: "25/04/86"
    },
    fecha_nacimiento_date: {
        type: DataTypes.DATEONLY
    },
    fecha_fallecimiento: {
        type: DataTypes.DATEONLY
    },
    id_ciudad_nacimiento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Ciudad,
            key: 'id_ciudad'
        }
    },
    biografia: {
        type: DataTypes.TEXT
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
    tableName: 'PERSONAJES',
    timestamps: false,
    indexes: [
        { fields: ['nombre_personaje', 'apellido_personaje'], name: 'idx_nombre' },
        { fields: ['id_ciudad_nacimiento'], name: 'idx_ciudad_nacimiento' },
        { fields: ['tipo'], name: 'idx_tipo' }
    ]
});

// Asociación a Ciudad (nacimiento) (N:1)
Ciudad.hasMany(Personaje, { foreignKey: 'id_ciudad_nacimiento', as: 'personajes' });
Personaje.belongsTo(Ciudad, { foreignKey: 'id_ciudad_nacimiento', as: 'ciudadNacimiento' });

export default Personaje;
