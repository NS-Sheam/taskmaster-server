const express = require("express");
const { TaskControllers } = require("./task.controller");

const router = express.Router();

router.get("/tasks", TaskControllers.getAllTasks);
router.post("/tasks", TaskControllers.createTask);
router.put("/tasks/:id", TaskControllers.updateTaskStatus);
router.delete("/tasks/:id", TaskControllers.deleteTask);

module.exports = router;
