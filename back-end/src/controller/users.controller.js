const usersService = require('../services/users.service');

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await usersService.getUserById(id);

  if (!type) {
    return res.status(200).json({ message });
  }

  res.status(type).json({ message });
};

const getAllUsers = async (req, res) => {
  const { type, message } = await usersService.getAllUsers();

  if (!type) {
    return res.status(200).json({ message });
  }

  res.status(type).json({ message });
};

module.exports = {
  getUserById,
  getAllUsers,
};
