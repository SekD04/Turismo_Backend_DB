// src/middleware/roles.middleware.js

/**
 * Middleware para verificar que el usuario tiene el rol permitido.
 * @param  {...string} rolesPermitidos -- ej. ['administrador']
 */
export const checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({ success: false, message: 'No se encontró información del usuario en el request' });
        }
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ success: false, message: 'Acceso denegado: rol insuficiente' });
        }
        next();
    };
};
