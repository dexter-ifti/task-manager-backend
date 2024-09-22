const Task = require('../models/task.model');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

// Create a new task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        user: req.user.id 
    });

    const user = await User.findById(req.user._id);
    user.tasks.push(task._id);
    await user.save();

    res.status(201).json(task);
});

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: req.user.id })
        .skip(skip)
        .limit(limit);

    const total = await Task.countDocuments({ user: req.user.id });

    res.status(200).json({
        tasks,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total
    });
});

// Get task by id
const getById = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
});

// Update task by id
const updateById = asyncHandler(async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
    }

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
});

// Delete task by id
const deleteById = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task });
});

// Get all tasks with filtering and sorting
const getAllTasksWithFilterAndSorting = asyncHandler(async (req, res) => {
    const { status, priority, sortBy, order = 'asc', page = 1, limit = 10 } = req.query;

    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(filter)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.status(200).json({
        tasks,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTasks: total
    });
});

module.exports = {
    createTask,
    getAllTasks,
    getById,
    updateById,
    deleteById,
    getAllTasksWithFilterAndSorting
};
