const { UserServices } = require("./user.service");

const getAllUsersFromDB = async (req, res) => {
  try {
    const users = await UserServices.getAllUserFromDB();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const result = await UserServices.createUserToDB(userData);
    res.json({ id: result.insertId, ...userData });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UserControllers = {
  getAllUsersFromDB,
  createUser,
};

module.exports = { UserControllers };
