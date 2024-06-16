const express = require("express");
const { UserControllers } = require("./user.controller");

const router = express.Router();

router.get("/users", UserControllers.getAllUsersFromDB);
router.post("/users", UserControllers.createUser);

module.exports = router;
