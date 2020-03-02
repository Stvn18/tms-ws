const packageCtrl = require('../controllers/package.controller');
const security = require('../config/security');

module.exports = ( router ) => {
    router.post('/package/register', security.validateToken, packageCtrl.createPackage);
    router.get('/package/all', security.validateToken, packageCtrl.findPackages);
};
