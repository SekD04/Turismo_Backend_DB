// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';
import Usuario from '../models/usuario.model.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Token no enviado' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token no válido' });
    }
    try {
        const payload = jwt.verify(token, jwtConfig.secret);
        // Por convención, payload contiene algo como { id_usuario, rol, iat, exp }
        req.usuario = {
            id: payload.id_usuario,
            rol: payload.rol
        };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token expirado o inválido' });
    }
};
