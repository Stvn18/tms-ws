const userCtrl = require('../controllers/user.controller');

module.exports = ( router ) => {
    router.post('/user/register', userCtrl.createUser);
};
