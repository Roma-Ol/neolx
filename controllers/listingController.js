const {
  getAllListings,
  createListing,
  updateListing,
  deleteListing,
} = require('../services/listingService');

const getAllListingsHandler = async (req, res) => {
  const listings = await getAllListings();
  res.status(200).send(listings);
};

const createListingHandler = async (req, res) => {
  const { body, user } = req;
  const userId = user._id;
  const newListing = await createListing({ ...body, author: userId });

  res.status(201).send(newListing);
};

const updateListingHandler = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await updateListing(id, req.body);

  res.status(200).send(updatedListing);
};

const deleteListingByIdHandler = async (req, res) => {
  const { id } = req.params;
  await deleteListing(id);

  res.status(204).send();
};

module.exports = {
  getAllListingsHandler,
  createListingHandler,
  updateListingHandler,
  deleteListingByIdHandler,
};
