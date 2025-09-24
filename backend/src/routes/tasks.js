const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/completar', completeTask);

module.exports = router;