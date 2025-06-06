// src/models/usuario.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombre_completo: {
        type: DataTypes.STRING(150)
    },
    telefono: {
        type: DataTypes.STRING(20)
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    rol: {
        // Añadimos un campo "rol" para distinguir entre 'usuario' y 'administrador' 
        type: DataTypes.ENUM('usuario', 'administrador'),
        defaultValue: 'usuario'
    }
}, {
    tableName: 'USUARIOS',
    timestamps: false,
    indexes: [
        { fields: ['email'], name: 'idx_email' },
        { fields: ['nombre_usuario'], name: 'idx_nombre_usuario' }
    ]
});

export default Usuario;
