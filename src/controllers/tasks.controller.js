const tasksCtrl = {};

const Task = require('../models/Task');

tasksCtrl.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

tasksCtrl.getMyTasks = async (req, res) => {
    const tasks = await Task.find({ authorId: req.params.id });
    res.json(tasks);
};

tasksCtrl.createTask = async (req, res) => {
    try {
        const { title, description, priority, authorId, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            priority,
            authorId,
            dueDate
        });
        await newTask.save();
        res.json('New Task added');
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

tasksCtrl.getTask = async (req, res) => {
    try {
        const tasks = await Task.findById(req.params.id);
        res.json(tasks);
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

tasksCtrl.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json('Task Deleted');
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

tasksCtrl.updateTask = async (req, res) => {
    try {
        const { title, description, priority, authorId, dueDate } = req.body;
        await Task.findByIdAndUpdate(req.params.id, {
            title,
            description,
            priority,
            authorId,
            dueDate
        });
        res.json('Task Updated');
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

module.exports = tasksCtrl;