const { User } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');

const getAllUsers = async () => {
  const allUsers = await User.find();

  return allUsers;
};

const getUserById = async (userId) => {
  await verifyEntityExists(userId, User);
  const selectedUser = await User.findById(userId);

  return selectedUser;
};

const updateUser = async (userId, newUserData) => {
  await verifyEntityExists(userId, User);
  const updatedUser = User.findByIdAndUpdate(userId, newUserData, { new: true });

  return updatedUser;
};

const deleteUser = async (userId) => {
  await verifyEntityExists(userId, User);
  await User.findByIdAndDelete(userId);
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
