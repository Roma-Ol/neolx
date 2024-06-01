const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Verification } = require('../models');
const {
  ConflictException,
  BadRequestException,
  NotFoundException,
} = require('../utils/exceptions');
const { sendTelegramApproveRequest } = require('./tgNotificationService');
const { createVerificationCode } = require('./verificationService');
const { updateUser } = require('./userServices');

const registerUser = async (body) => {
  const { name, phone, email, password } = body;

  const userExists = await User.findOne({ email });

  if (userExists) throw new ConflictException('Email already in use');

  const newUser = new User();
  const newVerificationCode = await createVerificationCode(newUser.id);

  Object.assign(newUser, {
    name,
    phone,
    email,
    password,
  });

  Object.assign(newVerificationCode, {
    userName: name,
    userEmail: email,
  });

  await sendTelegramApproveRequest(name, email);
  await newVerificationCode.save();
  await newUser.save();
};

const loginUser = async (body) => {
  const { email, password } = body;

  const userData = await User.findOne({ email });
  const passwordsMatch = userData ? await bcrypt.compare(password, userData.password) : false;

  if (!passwordsMatch) {
    throw new BadRequestException('Invalid credentials');
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  function generateToken(user) {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
  }

  return { token: generateToken(userData), role: userData.role };
};

const verifyUser = async (verificationCode) => {
  const verification = await Verification.findOne({ code: verificationCode });

  if (!verification) throw new NotFoundException('Verification code does not exist or expired.');
  await updateUser(verification.userId._id, { isVerified: true });
  await verification.deleteOne();
};

const getAllVerifications = async () => {
  const verifications = await Verification.find().populate('userId', 'name email');
  return verifications;
};

module.exports = { registerUser, loginUser, verifyUser, getAllVerifications };
