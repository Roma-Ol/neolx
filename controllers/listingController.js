const {
  getAllListings,
  createListing,
  updateListing,
  deleteListing, getUserListings,
} = require('../services/listingService');
const { statusCode } = require('../utils/constants');

const getAllListingsHandler = async (req, res) => {
  const listings = await getAllListings();
  res.status(statusCode.OK).send(listings);
};

const getUserListingsHandler = async (req, res) => {
  const listings = await getUserListings(req.user._id);
  res.status(statusCode.OK).send(listings);
};

const createListingHandler = async (req, res) => {
  const { body, user } = req;
  const userId = user._id;
  const newListing = await createListing({ ...body, author: userId });

  res.status(statusCode.CREATED).send(newListing);
};

const updateListingHandler = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await updateListing(id, req.body);

  res.status(statusCode.OK).send(updatedListing);
};

const deleteListingByIdHandler = async (req, res) => {
  const { id } = req.params;
  await deleteListing(id);

  res.status(statusCode.DELETED).send();
};

module.exports = {
  getAllListingsHandler,
  createListingHandler,
  updateListingHandler,
  deleteListingByIdHandler,
  getUserListingsHandler,
};
