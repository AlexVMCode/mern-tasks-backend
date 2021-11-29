const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = Router();
const { checkDuplicateEmail, checkRolesExisted } = require('../middlewares');

/**
 * @description Ruta para registrar usuarios.
 */
router.post("/signup", [checkDuplicateEmail, checkRolesExisted], authCtrl.signup);

/**
 * @description Ruta para iniciar sesión.
 */
router.post("/signin", authCtrl.signin);

module.exports = router;