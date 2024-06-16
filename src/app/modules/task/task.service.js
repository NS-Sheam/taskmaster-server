const { createDatabase, createTable, createTask, deleteTask, getAllTasks, updateTaskStatus } = require("./task.model");

const initializeDatabase = async () => {
  try {
    await createDatabase();
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

const initializeTable = async () => {
  try {
    await createTable();
  } catch (error) {
    console.error("Error initializing table:", error);
    throw error;
  }
};

const getAllTaskFromDB = async (dbQuery) => {
  try {
    const result = await getAllTasks(dbQuery);
    return result;
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

const createTaskToDB = async (taskData, callback) => {
  try {
    return await createTask(taskData, callback);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const updateTaskStatusToDB = async (taskId, newStatus, callback) => {
  try {
    await updateTaskStatus(taskId, newStatus, callback);
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

const deleteTaskFromDB = async (taskId, callback) => {
  try {
    await deleteTask(taskId, callback);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const TaskServices = {
  initializeDatabase,
  initializeTable,
  getAllTaskFromDB,
  createTaskToDB,
  updateTaskStatusToDB,
  deleteTaskFromDB,
};

module.exports = { TaskServices };
