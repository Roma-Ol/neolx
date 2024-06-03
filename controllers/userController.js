const { getAllUsers, getUserById, updateUser, deleteUser } = require('../services/userServices');
const { statusCode } = require('../utils/constants');

const getAllUsersHandler = async (req, res) => {
  const users = await getAllUsers();
  res.status(statusCode.OK).send(users);
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const selectedUser = await getUserById(id);

  res.status(statusCode.OK).send(selectedUser);
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);

  res.status(statusCode.OK).send(updatedUser);
};

const deleteUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);

  res.status(statusCode.DELETED).send();
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler,
};
