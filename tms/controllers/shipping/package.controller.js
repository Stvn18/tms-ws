'use strict';

const Package = require('../../models/shipping/Package');
const logService = require('../../services/log.service');

exports.createPackage = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {

        const { weight, code, fragile, description } = req.body;

        const pack = await Package.create({ weight, code, fragile, description });
        await pack.save();

        logService.saveLog(req, `Registró el paquete con código ${code} en el sistema`);

        res.json(pack);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar el paquete ${e}` });
    }
}

exports.findPackages = async (_, res, next) => {
    try {
        const locations = await Package.find();
        res.json(locations);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener el listado de paquetes ${e}` });
    }
}
