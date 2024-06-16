// Create tasks table if not exists
function createTable() {
  const query = `
      CREATE TABLE IF NOT EXISTS task_management (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        deadline DATE,
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
