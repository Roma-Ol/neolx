const { getAllUsers, getUserById, updateUser, deleteUser } = require('../services/userServices');

const getAllUsersHandler = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const selectedUser = await getUserById(id);

  res.status(200).send(selectedUser);
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);

  res.status(200).send(updatedUser);
};

const deleteUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);

  res.status(204).send();
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler,
};
