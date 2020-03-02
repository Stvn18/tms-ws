const locationCtrl = require('../controllers/location.controller');
const security = require('../config/security');

module.exports = ( router ) => {
    router.post('/location/register', security.validateToken, locationCtrl.createLocation);
    router.get('/location/all', security.validateToken, locationCtrl.findLocations);
};
