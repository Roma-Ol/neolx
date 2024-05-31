const { ForbiddenException } = require('../../utils/exceptions');

const ensureIsAdmin = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.role !== 'admin') throw new ForbiddenException('Only admins can do this!');

    next();
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = { ensureIsAdmin };
