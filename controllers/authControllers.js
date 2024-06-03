const { statusCode } = require('../utils/constants');
const {
  registerUser,
  loginUser,
  verifyUser,
  getAllVerifications,
} = require('../services/authService');

const registerHandler = async (req, res) => {
  const { body } = req;
  await registerUser(body);
  res.status(statusCode.CREATED).json({ status: 'success' });
};

const loginHandler = async (req, res) => {
  const { body } = req;
  const userData = await loginUser(body);
  res.status(statusCode.OK).json({ status: 'success', userData });
};

const verificationHandler = async (req, res) => {
  const { code } = req.params;
  await verifyUser(code);
  res.status(statusCode.OK).json({ status: 'success' });
};

const getAllVerificationsHandler = async (req, res) => {
  const verification = await getAllVerifications();
  res.status(statusCode.OK).send(verification);
};

module.exports = {
  registerHandler,
  loginHandler,
  getAllVerificationsHandler,
  verifyHandler: verificationHandler,
};
