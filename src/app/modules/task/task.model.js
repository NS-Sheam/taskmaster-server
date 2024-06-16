const { queryAsync } = require("../utils");

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      deadline DATE,
      status VARCHAR(20),
      assign_to VARCHAR(255),
      priority VARCHAR(20)
    )
  `;

  try {
    await queryAsync(query);
    console.log("Tasks table created or already exists");
  } catch (error) {
    console.error("Error creating tasks table:", error);
    throw error;
  }
};

const getAllTasks = async (dbQuery) => {
  if (dbQuery?.searchTerm) {
    const { searchTerm } = dbQuery;

    const query = `
      SELECT * FROM tasks 
      WHERE CONCAT(title, ' ', description, ' ', deadline, ' ', assign_to, ' ', status, ' ', priority) LIKE ?
    `;
    const values = [`%${searchTerm.toLowerCase()}%`];

    try {
      const results = await queryAsync(query, values);
      return results;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  const query = "SELECT * FROM tasks";
  try {
    const results = await queryAsync(query);
    return results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const createTask = async (taskData) => {
  const { title, description, deadline, assign_to, priority, status } = taskData;
  const query =
    "INSERT INTO tasks (title, description, deadline, assign_to, status, priority) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, description, deadline, assign_to, status, priority];

  try {
    const result = await queryAsync(query, values);
    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const updateTaskStatus = async (taskId, newStatus) => {
  const query = "UPDATE tasks SET status=? WHERE id=?";
  const values = [newStatus, taskId];

  try {
    const result = await queryAsync(query, values);
    return result;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  const query = "DELETE FROM tasks WHERE id=?";

  try {
    const result = await queryAsync(query, [taskId]);
    return result;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

module.exports = {
  createTable,
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
