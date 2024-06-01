const { NotFoundException } = require('../../utils/exceptions');
const { getListingById } = require('../../services/listingService');
const { Error } = require('mongoose');
const { statusCode } = require('../../utils/constants');

const compareIds = (id1, id2) => id1.toString() === id2.toString();

const ensureEditPermission = async (req, res, next) => {
  try {
    const { user, params } = req;
    const listing = await getListingById(params.id);

    if (!listing) throw new NotFoundException();
    if (compareIds(listing.author, user._id));
    if (listing.author.toString() !== user._id.toString())
      res.status(statusCode.FORBIDDEN).json({ error: 'Only authors can edit their listings!' })

    next();
  } catch (err) {
    next(new Error(err));
  }
};

const ensureDeletePermission = async (req, res, next) => {
  try {
    const { user, params } = req;
    const listing = await getListingById(params.id);

    if (!listing) res.status(statusCode.NOT_FOUND).json({ error: 'Such listing does not exist!' })
    if (user.role !== 'admin' && !compareIds(listing.author, user._id))
      res.status(statusCode.FORBIDDEN).json({ error: 'Only authors and admins can delete listings!' })

    next();
  } catch (err) {
    next(new Error(err));
  }
};

const ensureCreatePermission = async (req, res, next) => {
  try {
    const {user} = req;

    if (!user.isVerified)
      res.status(statusCode.FORBIDDEN).json({ error: 'Only verified users can create listings!' })

    next();
  } catch (err) {
    next(new Error(err))
  }
}

module.exports = { ensureEditPermission, ensureDeletePermission, ensureCreatePermission };
