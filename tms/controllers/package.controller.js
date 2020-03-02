'use strict';

const Package = require('../models/Package');
const logService = require('../services/log.service');

exports.createPackage = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {

        const { weight, code, fragile, description } = req.body;

        const package = await Package.create({ weight, code, fragile, description });
        await package.save();

        logService.saveLog(req, `Registró el paquete con código ${code} en el sistema`);

        res.json(package);
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
