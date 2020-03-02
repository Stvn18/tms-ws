const shippingCtrl = require('../../controllers/shipping/shipping.controller');
const security = require('../../config/security');

module.exports = (router) => {
    router.post('/shipping', security.validateToken, shippingCtrl.registerShipping);
    router.delete('/shipping/:shippingId/package/:packageId/remove', security.validateToken, shippingCtrl.removePackage);
    router.get('/shipping/byStatus/:status', security.validateToken, shippingCtrl.findShippingByStatus);
    router.get('/shipping/:id', security.validateToken, shippingCtrl.findById);
};
