const trunkCtrl = require('../controllers/trunk.controller');
const security = require('../config/security');

module.exports = ( router ) => {
    router.post('/trunk/register', security.validateToken, trunkCtrl.createTrunk);
    router.get('/trunk/all', security.validateToken, trunkCtrl.findTrunks);
};
