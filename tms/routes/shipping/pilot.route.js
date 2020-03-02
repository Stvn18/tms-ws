const pilotCtrl = require('../../controllers/shipping/pilot.controller');
const security = require('../../config/security');

module.exports = ( router ) => {
    router.post('/pilot/register', security.validateToken, pilotCtrl.createPilot);
    router.get('/pilot/all', security.validateToken, pilotCtrl.findPilots);
};
