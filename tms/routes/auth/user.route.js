const userCtrl = require('../../controllers/auth/user.controller');

module.exports = ( router ) => {
    router.post('/user/register', userCtrl.createUser);
};
