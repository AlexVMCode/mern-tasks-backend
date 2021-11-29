const authJWT = {};
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

/**
 * @description Función para verificar token
 * @param req Petición
 * @param res Respuesta
 * @param next Continuar ejecución
 */
authJWT.verifyToken = async (req, res, next) => {
    // Validar si existe token.
    let token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        // Decodificar token
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        // Validar usuario
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

authJWT.isAdmin = async (req, res, next) => {
    try {
        // Buscar usuario
        const user = await User.findById(req.userId);
        // Buscar rol
        const roles = await Role.find({ _id: { $in: user.roles } });

        // Validar si tiene el rol admin
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

module.exports = authJWT;