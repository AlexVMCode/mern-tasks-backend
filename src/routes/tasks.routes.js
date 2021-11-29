const { Router } = require('express');
const router = Router();

const taskCtrl = require('../controllers/tasks.controller');
const { verifyToken } = require('../middlewares')

router.get("/", verifyToken, taskCtrl.getTasks);

router.get("/myTasks/:id", verifyToken, taskCtrl.getMyTasks);

router.post("/", verifyToken, taskCtrl.createTask);

router.get("/:id", verifyToken, taskCtrl.getTask);

router.put("/:id", verifyToken, taskCtrl.updateTask);

router.delete("/:id", verifyToken, taskCtrl.deleteTask);

module.exports = router;