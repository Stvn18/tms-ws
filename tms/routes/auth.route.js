const authCtrl = require('../controllers/auth.controller');
const security = require('../config/security');

module.exports = ( router ) => {
    router.post('/auth/login', authCtrl.authenticateUser);
    router.post('/auth/logout', authCtrl.logout);
    router.get('/auth/logs', security.validateToken, authCtrl.getLogs);
};
