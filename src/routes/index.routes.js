const { Router } = require('express');
const router = Router();

// Routes auth
const routerAuth = require('./auth.routes');

// Routes tasks
const routerTasks = require('./tasks.routes');

router.use('/auth', routerAuth);
router.use('/tasks', routerTasks);

module.exports = router;