const { createHmac } = require('node:crypto');
const { Verification } = require('../models');

const createVerificationCode = async (userId) => {
  const hashedCode = generateHash(userId);
  return new Verification({ code: hashedCode, active: true, userId });
};

const generateHash = (userParam) => {
  const secret = 'secret';
  return createHmac('sha256', `${secret}`).update(`${userParam}-${Date.now()}`).digest('hex');
};

module.exports = { createVerificationCode };
