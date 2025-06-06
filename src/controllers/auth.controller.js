// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';
import Usuario from '../models/usuario.model.js';

export const register = async (req, res) => {
    try {
        // Solo recibimos estos campos, sin “rol”
        const { nombre_usuario, email, password, nombre_completo, telefono, fecha_nacimiento } = req.body;

        // 1. Verificar si ya existe email o nombre de usuario
        const existeEmail = await Usuario.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(409).json({ success: false, message: 'El email ya está en uso' });
        }
        const existeUsuario = await Usuario.findOne({ where: { nombre_usuario } });
        if (existeUsuario) {
            return res.status(409).json({ success: false, message: 'El nombre de usuario ya está en uso' });
        }

        // 2. Hashear la contraseña
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // 3. Crear el usuario con rol por defecto “usuario”
        const usuario = await Usuario.create({
            nombre_usuario,
            email,
            password_hash,
            nombre_completo,
            telefono,
            fecha_nacimiento,
            rol: 'usuario'   // Se fuerza rol “usuario” siempre
        });

        return res.status(201).json({
            success: true,
            data: {
                id_usuario: usuario.id_usuario,
                nombre_usuario: usuario.nombre_usuario,
                email: usuario.email,
                rol: usuario.rol,
                nombre_completo: usuario.nombre_completo,
                telefono: usuario.telefono,
                fecha_nacimiento: usuario.fecha_nacimiento
            },
            message: 'Usuario registrado correctamente'
        });
    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar existencia del usuario
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
        // Comparar contraseña
        const validPassword = await bcrypt.compare(password, usuario.password_hash);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
        // Generar JWT
        const payload = {
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            rol: usuario.rol
        };
        const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        return res.json({
            success: true,
            data: {
                token,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre_usuario: usuario.nombre_usuario,
                    email: usuario.email,
                    rol: usuario.rol
                }
            },
            message: 'Login exitoso'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error en el login' });
    }

};

export const getPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: ['id_usuario', 'nombre_usuario', 'email', 'rol', 'nombre_completo', 'telefono', 'fecha_nacimiento']
        });

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        return res.json({ success: true, data: usuario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener perfil' });
    }
};
