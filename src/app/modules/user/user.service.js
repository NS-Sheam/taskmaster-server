const { createDatabase } = require("../task/task.model");
const { createUserTable, getAllUsers, createUser } = require("./user.model");

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
    await createUserTable();
  } catch (error) {
    console.error("Error initializing table:", error);
    throw error;
  }
};

const getAllUserFromDB = async (dbQuery) => {
  try {
    const result = await getAllUsers(dbQuery);
    return result;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

const createUserToDB = async (userData, callback) => {
  try {
    return await createUser(userData, callback);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const UserServices = {
  initializeDatabase,
  initializeTable,
  getAllUserFromDB,
  createUserToDB,
};

module.exports = { UserServices };
