// src/controllers/usuarios.controller.js
import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id_usuario', 'nombre_usuario', 'email', 'nombre_completo', 'telefono', 'fecha_nacimiento', 'activo', 'rol', 'fecha_registro']
        });
        return res.json({ success: true, data: usuarios, message: 'Usuarios obtenidos correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await Usuario.findByPk(id_usuario, {
            attributes: ['id_usuario', 'nombre_usuario', 'email', 'nombre_completo', 'telefono', 'fecha_nacimiento', 'activo', 'rol', 'fecha_registro']
        });
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        return res.json({ success: true, data: usuario, message: 'Usuario obtenido correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener usuario' });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { nombre_usuario, email, nombre_completo, telefono, fecha_nacimiento, activo, rol, password } = req.body;
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        // Si actualizan email o nombre_usuario, verificar unicidad
        if (email && email !== usuario.email) {
            const existeEmail = await Usuario.findOne({ where: { email } });
            if (existeEmail) {
                return res.status(409).json({ success: false, message: 'El email ya está en uso' });
            }
        }
        if (nombre_usuario && nombre_usuario !== usuario.nombre_usuario) {
            const existeNombre = await Usuario.findOne({ where: { nombre_usuario } });
            if (existeNombre) {
                return res.status(409).json({ success: false, message: 'El nombre de usuario ya existe' });
            }
        }
        // Si proporcionan nueva contraseña
        let password_hash = usuario.password_hash;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password_hash = await bcrypt.hash(password, salt);
        }
        await usuario.update({
            nombre_usuario,
            email,
            password_hash,
            nombre_completo,
            telefono,
            fecha_nacimiento,
            activo,
            rol
        });
        return res.json({ success: true, data: usuario, message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al actualizar usuario' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        return res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
    }
};

/**
 * @desc    Crear un nuevo usuario con rol 'administrador'
 * @route   POST /api/v1/usuarios
 * @access  Privado (solo administrador)
 */
export const createAdministrador = async (req, res) => {
    try {
        // Destructurar campos requeridos del body
        const { nombre_usuario, email, password, nombre_completo, telefono, fecha_nacimiento } = req.body;

        // 1. Verificar existencia de email o nombre de usuario
        const existeEmail = await Usuario.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(409).json({
                success: false,
                message: 'El email ya está en uso'
            });
        }
        const existeUsername = await Usuario.findOne({ where: { nombre_usuario } });
        if (existeUsername) {
            return res.status(409).json({
                success: false,
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // 2. Hashear la contraseña
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // 3. Crear el usuario con rol 'administrador'
        const nuevoAdmin = await Usuario.create({
            nombre_usuario,
            email,
            password_hash,
            nombre_completo,
            telefono,
            fecha_nacimiento,
            rol: 'administrador'   // Forzamos rol administrador
        });

        // 4. Devolver respuesta (sin exponer el password_hash)
        return res.status(201).json({
            success: true,
            data: {
                id_usuario: nuevoAdmin.id_usuario,
                nombre_usuario: nuevoAdmin.nombre_usuario,
                email: nuevoAdmin.email,
                rol: nuevoAdmin.rol,
                nombre_completo: nuevoAdmin.nombre_completo,
                telefono: nuevoAdmin.telefono,
                fecha_nacimiento: nuevoAdmin.fecha_nacimiento
            },
            message: 'Administrador creado correctamente'
        });
    } catch (error) {
        console.error('Error en createAdministrador:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear administrador'
        });
    }
};

