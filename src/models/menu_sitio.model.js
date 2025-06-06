// src/models/menu_sitio.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Sitio from './sitio.model.js';
import Plato from './plato.model.js';

const MenuSitio = sequelize.define('MenuSitio', {
    id_menu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_sitio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sitio,
            key: 'id_sitio'
        }
    },
    id_plato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plato,
            key: 'id_plato'
        }
    },
    precio_plato: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    es_especialidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fecha_inicio_disponibilidad: {
        type: DataTypes.DATEONLY
    },
    fecha_fin_disponibilidad: {
        type: DataTypes.DATEONLY
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
    tableName: 'MENU_SITIO',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['id_sitio', 'id_plato'], name: 'unique_sitio_plato' },
        { fields: ['id_sitio'], name: 'idx_sitio' },
        { fields: ['id_plato'], name: 'idx_plato' }
    ]
});

// Asociación N:M entre Sitio y Plato a través de MenuSitio
Sitio.belongsToMany(Plato, {
    through: MenuSitio,
    foreignKey: 'id_sitio',
    otherKey: 'id_plato',
    as: 'platosDisponibles'
});
Plato.belongsToMany(Sitio, {
    through: MenuSitio,
    foreignKey: 'id_plato',
    otherKey: 'id_sitio',
    as: 'sitiosQueOfrecen'
});

export default MenuSitio;
