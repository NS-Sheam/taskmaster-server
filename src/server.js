const app = require("./app");
const config = require("./app/config");
const { queryAsync, dbChangeUserAsync, db } = require("./app/modules/utils");
const { createTable } = require("./app/modules/task/task.model");
const { createUserTable } = require("./app/modules/user/user.model");
const PORT = config.PORT;

const createDatabase = async () => {
  const query = "CREATE DATABASE IF NOT EXISTS task_management";

  try {
    await queryAsync(query);
    await dbChangeUserAsync({ database: "task_management" });
    await createTable();
    await createUserTable();
  } catch (error) {
    console.error("Error creating or setting up database:", error);
    throw error;
  }
};

db.connect(async (err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");

    await createDatabase();
  }
});

const startServer = () => {
  console.log("Starting the server");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
