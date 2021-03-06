const express = require('express');
const {taskValidator, taskValidatorRules} = require('../middlewares/task-validator');
const {saveTask, getTasks, deleteTask, updateTask} = require('../controllers/tasks');

let router = express.Router();

router.post('/tasks', taskValidatorRules(), taskValidator, saveTask);
router.get('/tasks', getTasks);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', taskValidatorRules(), taskValidator, updateTask);

module.exports = router;