'use strict';

const Shipping = require('../../models/shipping/Shipping');
const Trunk = require('../../models/shipping/Trunk');
const Package = require('../../models/shipping/Package');
const Location = require('../../models/common/Location');

const logService = require('../../services/log.service');

exports.registerShipping = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {
        const { trunk, origin, destination, packages } = req.body;
        const trunkId = trunk._id;
        const originId = origin._id;
        const destinationId = destination._id;

        if (!trunkId || !originId || !destinationId) {
            return next({ statusCode: 400, message: 'Datos incompletos' });
        }

        const trunkSaved = await Trunk.findById(trunkId);
        if (!trunkSaved) {
            return next({ statusCode: 404, message: 'No existe el camión seleccionado' });
        }

        const originSaved = await Location.findById(originId);
        if (!originSaved) {
            return next({ statusCode: 404, message: 'No existe el origen seleccionado' });
        }

        const destinationSaved = await Location.findById(destinationId);
        if (!destinationSaved) {
            return next({ statusCode: 404, message: 'No existe el destino seleccionado' });
        }

        if (!packages || packages.length === 0) {
            return next({ statusCode: 400, message: 'Por favor ingresar al menos 1 paquete al envío' });
        }

        const shipping = await Shipping.create({
            trunk: trunkSaved,
            origin: originSaved,
            destination: destinationSaved,
            status: 0,
            total: req.body.total,
            paymentType: req.body.paymentType,
            phoneReference: req.body.phoneReference,
            quantityPackages: req.body.quantityPackages,
            packages
        });
        await shipping.save();

        logService.saveLog(req, `Registró el envío No. ${shipping._id} en el sistema con destino a ${destinationSaved.comments}`);

        res.json(shipping);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar el envío ${e}` });
    }
}

exports.removePackage = async (req, res, next) => {
    try {
        if (!req.params) return next({ statusCode: 400, message: 'Datos incompletos' });

        const shipping = await Shipping.findById(req.params.shippingId);
        if (!shipping) return next({ statusCode: 404, message: 'No existe el envío consultado' });

        const packageToDelete = await Package.findById(req.params.packageId);
        if (!packageToDelete) return next({ statusCode: 404, message: 'No existe el paquete a eliminar' });

        const index = shipping.packages.indexOf(packageToDelete);
        if (index > -1) {
            shipping.packages.splice(index, 1);
            await shipping.save();

            logService.saveLog(req, `Eliminó el paquete No. ${packageToDelete._id} del envío No. ${shipping._id}`);

            res.json(shipping);
        } else {
            return next({ statusCode: 404, message: 'No existe el paquete a eliminar' });
        }
    } catch (e) {
        return next({ statusCode: 500, message: `Error al eliminar el paquete del envío ${e}` });
    }
}

exports.findShippingByStatus = async (req, res, next) => {
    try {
        if (!req.params) return next({ statusCode: 400, message: 'Datos incompletos' });
        const shippings = await Shipping
            .find({ status: req.params.status })
            .populate('trunk')
            .populate('origin')
            .populate('destination');

        res.json(shippings);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener el listado de envíos ${e}` });
    }
}

exports.findById = async (req, res, next) => {
    try {
        if (!req.params) return next({ statusCode: 400, message: 'Datos incompletos' });

        const shipping = await Shipping.findById(req.params.id)
            .populate('trunk')
            .populate('origin')
            .populate('destination')
            .populate('packages');
        if (!shipping) return next({ statusCode: 404, message: 'No existe el envío consultado' });

        res.json(shipping);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener los datos del envío ${e}` });
    }
}
