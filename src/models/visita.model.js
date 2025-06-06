// src/models/visita.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Usuario from './usuario.model.js';
import Sitio from './sitio.model.js';

const Visita = sequelize.define('Visita', {
    id_visita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_sitio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sitio,
            key: 'id_sitio'
        }
    },
    fecha_visita: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_visita: {
        type: DataTypes.TIME
    },
    calificacion: {
        type: DataTypes.TINYINT,
        validate: { min: 1, max: 5 }
    },
    comentario: {
        type: DataTypes.TEXT
    },
    recomendaria: {
        type: DataTypes.BOOLEAN
    },
    tiempo_permanencia: {
        type: DataTypes.INTEGER // en minutos
    },
    clima: {
        type: DataTypes.STRING(50)
    },
    acompañantes: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    gasto_aproximado: {
        type: DataTypes.DECIMAL(10, 2)
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'VISITA',
    timestamps: false,
    indexes: [
        { fields: ['id_usuario'], name: 'idx_usuario' },
        { fields: ['id_sitio'], name: 'idx_sitio' },
        { fields: ['fecha_visita'], name: 'idx_fecha_visita' },
        { fields: ['calificacion'], name: 'idx_calificacion' }
    ]
});

// Asociaciones N:1
Usuario.hasMany(Visita, { foreignKey: 'id_usuario', as: 'visitas' });
Visita.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Sitio.hasMany(Visita, { foreignKey: 'id_sitio', as: 'visitas' });
Visita.belongsTo(Sitio, { foreignKey: 'id_sitio', as: 'sitio' });

export default Visita;
