const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { description, category, dueDate, assignedTo } = req.body;
  const newTask = new Task({
    description,
    category,
    dueDate,
    assignedTo: req.user.role === 'admin' ? assignedTo : req.user.id,
    creator: req.user.id,
  });
  await newTask.save();
  res.json(newTask);
};

exports.getTasks = async (req, res) => {
  const tasks = req.user.role === 'admin'
    ? await Task.find()
    : await Task.find({ creator: req.user.id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  if (req.user.role !== 'admin' && task.creator.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  if (req.user.role !== 'admin' && task.creator.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  await task.remove();
  res.json({ msg: 'Task deleted' });
};
