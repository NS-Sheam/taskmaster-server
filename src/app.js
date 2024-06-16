const express = require("express");
const cors = require("cors");
const taskRoutes = require("./app/modules/task/task.routes");
const userRoutes = require("./app/modules/user/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
