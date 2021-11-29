const verifySignup = {};
const User = require('../models/User');
const Rol = require('../models/Role');

/**
 * @description Valida si el email enviado  ya está registrado.
 */
verifySignup.checkDuplicateEmail = async (req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email)
            return res.status(200).json({ message: "El correo ya se encuentra registrado." });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * @description Valida si los roles enviados existen.
 */
verifySignup.checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            const rol = await Rol.findOne({ name: req.body.roles[i] });
            if (rol === null) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`,
                });
            }
        }
    }
    next();
};

module.exports = verifySignup;