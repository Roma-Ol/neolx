const Joi = require('joi');

const createListingSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .message('Title must be between 3 and 30 characters'),
  description: Joi.string().required().min(10).message('Description must be minimum 10 characters'),
  price: Joi.number().required(),
});

const updateListingSchema = Joi.object({
  title: Joi.string().min(3).max(30).message('Title must be between 3 and 30 characters'),
  description: Joi.string().min(10).message('Title must be minimum 10 characters'),
  price: Joi.number(),
}).or('title', 'description', 'price'); // Require at least one of these fields

const validateListingCreate = (req, res, next) => {
  const { error } = createListingSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const validateListingUpdate = (req, res, next) => {
  const { error } = updateListingSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = { validateListingCreate, validateListingUpdate };
