const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper');
const { authGuard } = require('../middlewares/authentication/authGuard');
const {
  createListingHandler,
  getAllListingsHandler,
  updateListingHandler,
  deleteListingByIdHandler,
} = require('../controllers/listingController');
const { ensureEditPermission, ensureDeletePermission } = require('../middlewares/permissions');
const { validateListingCreate, validateListingUpdate } = require('../middlewares/validations');

router.get('/all', authGuard, asyncWrapper(getAllListingsHandler));
router.post('/', authGuard, validateListingCreate, asyncWrapper(createListingHandler));
router.put(
  '/:id',
  authGuard,
  ensureEditPermission,
  validateListingUpdate,
  asyncWrapper(updateListingHandler),
);
router.delete('/:id', authGuard, ensureDeletePermission, asyncWrapper(deleteListingByIdHandler));

module.exports = router;
