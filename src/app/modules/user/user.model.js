const { queryAsync } = require("../utils");

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  try {
    await queryAsync(query);
    console.log("User table created or already exists");
  } catch (error) {
    console.error("Error creating tasks table:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  try {
    const results = await queryAsync(query);
    return results;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const createUser = async (userData) => {
  const { name, email, password } = userData;

  const query = `
        INSERT INTO users (name, email, password) VALUES (?, ?, ?)
    `;
  const values = [name, email, password];

  try {
    const result = await queryAsync(query, values);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = { createUserTable, getAllUsers, createUser };
