// task Router 
const router = require('express').Router();
const {
    createTask,
    getAllTasks,
    getById,
    updateById,
    deleteById,
    getAllTasksWithFilterAndSorting
} = require('../controllers/task.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

// tasks/
router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
// tasks/filter
router.get('/filter', authMiddleware, getAllTasksWithFilterAndSorting);
router.get('/:id', authMiddleware, getById);
router.patch('/:id', authMiddleware, updateById);
router.delete('/:id', authMiddleware, deleteById);


module.exports = router;