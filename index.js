const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_management",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    createDatabase(); // Move createDatabase call here
  }
});

// create database
function createDatabase() {
  const query = "CREATE DATABASE IF NOT EXISTS task_management";

  db.query(query, (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database created or already exists");
      db.changeUser({ database: "task_management" }, (err) => {
        if (err) {
          console.error("Error setting default database:", err);
        } else {
          console.log("Default database set to task_management");
          createTable(); // Move createTable call here
          startServer();
        }
      });
    }
  });
}

function createTable() {
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

  db.query(query, (err) => {
    if (err) {
      console.error("Error creating tasks table:", err);
    } else {
      console.log("Tasks table created or already exists");
    }
  });
}

function startServer() {
  // Routes
  app.get("/tasks", (req, res) => {
    const query = "SELECT * FROM tasks";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    });
  });

  app.post("/tasks", (req, res) => {
    const { title, description, deadline, assign_to, priority, status } = req.body;
    const query =
      "INSERT INTO tasks (title, description, deadline, assign_to, status, priority) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, description, deadline, assign_to, status, priority];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ id: result.insertId, ...req.body });
      }
    });
  });

  app.put("/tasks/:id", (req, res) => {
    console.log(req.body, req.params);

    const taskId = req.params.id;
    const { status } = req.body;
    const query = "UPDATE tasks SET status=? WHERE id=?";
    const values = [status, taskId];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ id: taskId, ...req.body });
      }
    });
  });

  app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const query = "DELETE FROM tasks WHERE id=?";

    db.query(query, [taskId], (err) => {
      if (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Task deleted successfully" });
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
