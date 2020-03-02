'use strict';

const Trunk = require('../models/Trunk');
const Pilot = require('../models/Pilot');
const logService = require('../services/log.service');

exports.createTrunk = async (req, res, next) => {
    if (!req.body || req.params) {
        return next({ statusCode: 400, message: 'Datos incompletos' });
    }
    try {
        const idPilot = req.params.id;
        const pilot = await Pilot.findById(idPilot);

        if (!pilot) return next({ statusCode: 404, message: 'No existe el piloto seleccionado' });

        const { model, brand, code, year, capacity } = req.body;
        const trunk = await Trunk.create({ model, brand, code, year, capacity, pilot });
        await trunk.save();
        logService.saveLog(req, `Registró camión con código ${code} en el sistema`);
        res.json(trunk);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar el camión ${e}` });
    }
}

exports.findTrunks = async (_, res, next) => {
    try {
        const trunks = await Trunk.find();
        res.json(trunks);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener el listado de camiones ${e}` });
    }
}
