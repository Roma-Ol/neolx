const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper');
const { authGuard } = require('../middlewares/authentication/authGuard');
const {
  createListingHandler,
  getAllListingsHandler,
  updateListingHandler,
  deleteListingByIdHandler, getUserListingsHandler,
} = require('../controllers/listingController');
const { ensureEditPermission, ensureDeletePermission } = require('../middlewares/permissions');
const { validateListingCreate, validateListingUpdate } = require('../middlewares/validations');
const { ensureCreatePermission } = require('../middlewares/permissions/listingPermissions');

router.get('/all', asyncWrapper(getAllListingsHandler));
router.get('/my', authGuard, asyncWrapper(getUserListingsHandler));
router.post('/', authGuard, ensureCreatePermission ,validateListingCreate, asyncWrapper(createListingHandler));
router.put(
  '/:id',
  authGuard,
  ensureEditPermission,
  validateListingUpdate,
  asyncWrapper(updateListingHandler),
);
router.delete('/:id', authGuard, ensureDeletePermission, asyncWrapper(deleteListingByIdHandler));

module.exports = router;
