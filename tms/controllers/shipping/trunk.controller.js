'use strict';

const Trunk = require('../../models/shipping/Trunk');
const Pilot = require('../../models/shipping/Pilot');
const logService = require('../../services/log.service');

exports.createTrunk = async (req, res, next) => {
    if (!req.body) {
        return next({ statusCode: 400, message: 'Datos incompletos' });
    }
    try {
        const { model, brand, code, year, capacity } = req.body;
        let trunk = new Trunk();
        if (req.body.pilot) {
            const idPilot = req.body.pilot._id;
            const pilot = await Pilot.findById(idPilot);

            if (!pilot) return next({ statusCode: 404, message: 'No existe el piloto seleccionado' });
            
            trunk = await Trunk.create({ model, brand, code, year, capacity, pilot });
            await trunk.save();

            pilot.assigned = true;
            await pilot.save();
        } else {
            console.log(req.body);
            trunk = await Trunk.create({ model, brand, code, year, capacity });
            await trunk.save();
        }

        logService.saveLog(req, `Registró camión con código ${code} en el sistema`);
        res.json(trunk);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar el camión ${e}` });
    }
}

exports.findTrunks = async (_, res, next) => {
    try {
        const trunks = await Trunk.find().populate('pilot');
        res.json(trunks);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener el listado de camiones ${e}` });
    }
}

exports.assignPilot = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {
        const idPilot = req.body._id;
        const pilot = await Pilot.findById(idPilot);

        if (!pilot) return next({ statusCode: 404, message: 'No existe el piloto seleccionado' });

        const trunk = await Trunk.findById(req.params.id);

        if (!trunk) return next({ statusCode: 404, message: 'No existe el camión seleccionado' });

        // Si ya tiene asignado un piloto, lo desasigna
        if (trunk.pilot) {
            const previousPilot = await Pilot.findById(trunk.pilot._id);
            previousPilot.assigned = false;
            await previousPilot.save();
        }

        trunk.pilot = pilot;
        await trunk.save();

        pilot.assigned = true;
        await pilot.save();

        res.json(trunk);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al asignar el piloto al camión ${e}` });
    }
}
