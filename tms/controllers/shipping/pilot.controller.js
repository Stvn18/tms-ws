'use strict';

const Pilot = require('../../models/shipping/Pilot');
const logService = require('../../services/log.service');

exports.createPilot = async (req, res, next) => {
    if ( !req.body ) {
        return next({ statusCode: 400, message: 'Datos incompletos' });
    }
    try {
        const pilot = await Pilot.create(req.body);
        await pilot.save();

        logService.saveLog(req, `Registró al piloto ${pilot.name} ${pilot.lastName} en el sistema`);

        res.json(pilot);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar al piloto ${e}` });
    }
}

exports.findPilots = async (_, res, next) => {
    try {
        const pilots = await Pilot.find();
        res.json(pilots);
    } catch ( e ) {
        return next({ statusCode: 500, message: `Error al obtener el listado de pilotos ${e}` });
    }
}
