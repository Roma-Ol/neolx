const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).message('Name must be between 3 and 30 characters'),
  phone: Joi.string()
    .required()
    .pattern(/^(?:\+38)?0\d{9}$/)
    .message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().required().email().message('Email must be a valid email address'),
  password: Joi.string().min(6).max(18).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).message('Name must be between 3 and 30 characters'),
  phone: Joi.string()
    .pattern(/^(?:\+38)?0\d{9}$/)
    .message('Number must be a valid Ukrainian phone number'),
  email: Joi.string().required().email().message('Email must be a valid email address'),
  role: Joi.string().messages({
    'string.base': 'Role must be a string',
    'string.empty': 'Role is required',
  }),
}).or('name', 'phone_number', 'email', 'role'); // Require at least one of these fields

const loginUserSchema = Joi.object({
  email: Joi.string().required().email().message('Email must be a valid email address'),
  password: Joi.string().min(6).max(18).required(),
});

const validateUserCreate = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const validateUserLogin = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = { validateUserCreate, validateUserLogin, validateUserUpdate };
