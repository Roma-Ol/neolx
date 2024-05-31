const { Listing } = require('../models');
const { verifyEntityExists } = require('../utils/verifyEntityExists');

const getAllListings = async () => {
  const allListings = await Listing.find();

  return allListings;
};

const getListingById = async (listingId) => {
  await verifyEntityExists(listingId, Listing);
  const selectedListing = await Listing.findById(listingId);

  return selectedListing;
};

const createListing = async (listingData) => {
  const newListing = await Listing.create(listingData);

  return newListing;
};

const updateListing = async (listingId, newListingData) => {
  await verifyEntityExists(listingId, Listing);
  const updatedListing = Listing.findByIdAndUpdate(listingId, newListingData, { new: true });

  return updatedListing;
};

const deleteListing = async (listingId) => {
  await verifyEntityExists(listingId, Listing);
  await Listing.findByIdAndDelete(listingId);
};

module.exports = { getAllListings, createListing, updateListing, getListingById, deleteListing };
