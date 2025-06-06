// src/models/relacion_sitio_plato.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Sitio from './sitio.model.js';
import Plato from './plato.model.js';

const RelacionSitioPlato = sequelize.define('RelacionSitioPlato', {
    id_relacion: {
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
    tipo_relacion: {
        type: DataTypes.ENUM('prepara', 'sirve', 'especializa', 'ofrece'),
        defaultValue: 'prepara'
    },
    calidad: {
        type: DataTypes.ENUM('excelente', 'buena', 'regular'),
        defaultValue: 'buena'
    },
    precio_promedio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    fecha_desde: {
        type: DataTypes.DATEONLY
    },
    fecha_hasta: {
        type: DataTypes.DATEONLY
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'RELACION_SITIO_PLATO',
    timestamps: false,
    indexes: [
        { fields: ['id_sitio', 'id_plato'], name: 'idx_sitio_plato' },
        { fields: ['tipo_relacion'], name: 'idx_tipo_relacion' }
    ]
});

// Asociación N:M a través de RelacionSitioPlato
Sitio.belongsToMany(Plato, {
    through: RelacionSitioPlato,
    foreignKey: 'id_sitio',
    otherKey: 'id_plato',
    as: 'platosRelacionados'
});
Plato.belongsToMany(Sitio, {
    through: RelacionSitioPlato,
    foreignKey: 'id_plato',
    otherKey: 'id_sitio',
    as: 'sitiosRelacionados'
});

export default RelacionSitioPlato;
