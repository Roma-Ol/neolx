const express = require('express');
const router = express.Router();
const {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler,
} = require('../controllers/userController');
const { validateUserUpdate } = require('../middlewares/validations/userValidate');
const { authGuard } = require('../middlewares/authentication/authGuard');

const asyncWrapper = require('../utils/asyncWrapper');
const { ensureIsAdmin } = require('../middlewares/permissions');

router.get('/all', authGuard, ensureIsAdmin, asyncWrapper(getAllUsersHandler));
router.get('/:id', authGuard, ensureIsAdmin, asyncWrapper(getUserByIdHandler));
router.put('/:id', authGuard, ensureIsAdmin, validateUserUpdate, asyncWrapper(updateUserHandler));
router.delete('/:id', authGuard, ensureIsAdmin, asyncWrapper(deleteUserByIdHandler));

module.exports = router;
