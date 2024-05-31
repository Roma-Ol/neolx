const { validateListingCreate, validateListingUpdate } = require('./listingValidate');
const { validateUserCreate, validateUserLogin, validateUserUpdate } = require('./userValidate');

module.exports = {
  validateListingCreate,
  validateListingUpdate,
  validateUserCreate,
  validateUserLogin,
  validateUserUpdate,
};
