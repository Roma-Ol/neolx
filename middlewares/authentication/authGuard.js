const { UnauthorizedException } = require('../../utils/exceptions');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const authGuard = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) throw new UnauthorizedException();

    const jwtPayload = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: jwtPayload.id });

    if (!user) throw new UnauthorizedException();

    req.user = user;
    next();
  } catch {
    next(new UnauthorizedException());
  }
};

module.exports = { authGuard };
