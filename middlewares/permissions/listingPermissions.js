const { NotFoundException, ForbiddenException } = require('../../utils/exceptions');
const { getListingById } = require('../../services/listingService');

const compareIds = (id1, id2) => id1.toString() === id2.toString();

const ensureEditPermission = async (req, res, next) => {
  try {
    const { user, params } = req;
    const listing = await getListingById(params.id);

    if (!listing) throw new NotFoundException();
    if (compareIds(listing.author, user._id));
    if (listing.author.toString() !== user._id.toString())
      throw new ForbiddenException('Only authors can edit their listings!');

    next();
  } catch (err) {
    next(new Error(err));
  }
};

const ensureDeletePermission = async (req, res, next) => {
  try {
    const { user, params } = req;
    const listing = await getListingById(params.id);

    if (!listing) throw new NotFoundException();
    if (user.role !== 'admin' && !compareIds(listing.author, user._id))
      throw new ForbiddenException('Only authors and admins can delete listings!');

    next();
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = { ensureEditPermission, ensureDeletePermission };
