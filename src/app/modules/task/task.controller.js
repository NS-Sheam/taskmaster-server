const { TaskServices } = require("./task.service");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskServices.getAllTaskFromDB(req?.query);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  const taskData = req.body;

  try {
    const result = await TaskServices.createTaskToDB(taskData);
    res.json({ id: result.insertId, ...taskData });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  try {
    await TaskServices.updateTaskStatusToDB(taskId, status);
    res.json({ id: taskId, status });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await TaskServices.deleteTaskFromDB(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const TaskControllers = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};

module.exports = { TaskControllers };
