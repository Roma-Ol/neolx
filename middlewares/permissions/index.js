const { ensureDeletePermission, ensureEditPermission } = require('./listingPermissions');
const { ensureIsAdmin } = require('./userPermission');

module.exports = { ensureDeletePermission, ensureEditPermission, ensureIsAdmin };
