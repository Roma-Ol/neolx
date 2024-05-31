const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper');
const {
  registerHandler,
  loginHandler,
  verifyHandler,
  getAllVerificationsHandler,
} = require('../controllers/authControllers');
const { validateUserCreate, validateUserLogin } = require('../middlewares/validations');
const { authGuard } = require('../middlewares/authentication/authGuard');
const { ensureIsAdmin } = require('../middlewares/permissions');

router.post('/register', validateUserCreate, asyncWrapper(registerHandler));
router.post('/login', validateUserLogin, asyncWrapper(loginHandler));
router.get('/verify/:code', asyncWrapper(verifyHandler));
router.get('/verifications', authGuard, ensureIsAdmin, asyncWrapper(getAllVerificationsHandler));

module.exports = router;
