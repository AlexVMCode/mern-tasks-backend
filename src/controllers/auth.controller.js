const authCtrl = {};
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const config = require('../config');


/**
 * @description Función para registrar usuarios
 * @param req Petición
 * @param res Respuesta
 * @return token
 */
authCtrl.signup = async (req, res) => {
    try {
        // Obtener el cuerpo de la petición.
        const { name, email, password, roles } = req.body;
        const newUser = new User({
            name,
            email,
            password: await User.encryptPassword(password)
        });

        // Validación para roles.
        if (req.body.roles) {
            // Asignar roles que son enviados.
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            // Asignar rol por defecto.
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        // Guardando objeto usuario en MongoDB
        const savedUser = await newUser.save();
        
        // Retornar respuesta
        return res.status(200).json({ statusCode: 200, message: 'User created successfully' })
    }
    catch (err) {
        console.log(error);
        return res.status(500).json(error);
    }
};

/**
 * @description Función para iniciar sesión
 * @param req Petición
 * @param res Respuesta
 * @return token
 */
authCtrl.signin = async (req, res) => {
    try {
        // Obtener el cuerpo de la petición.
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        // Responder si no existe el usuario.
        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        // Validar la contraseña
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        // Responder si la contraseña es inválida.
        if (!matchPassword)
            return res.status(200).json({
                token: null,
                message: "Correo o contraseña no son correctos.",
            });

        // Crear un token
        const token = jwt.sign({ id: userFound._id, name: userFound.name }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        // Retornar respuesta
        return res.status(200).json({ token })
    }
    catch (err) {
        console.log(error);
        return res.status(500).json(error);
    }
};
module.exports = authCtrl;