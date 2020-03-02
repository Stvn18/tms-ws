'use strict';

const Location = require('../models/Location');
const Country = require('../models/Country');
const Department = require('../models/Department');
const logService = require('../services/log.service');

exports.createLocation = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {

        const { zone, avenue, street } = req.body;
        let { comments } = req.body;

        const country = await Country.create(req.body.country);
        await country.save();

        const department = await Department.create({
            name: req.body.department.name,
            country: country._id.toString()
        });
        await department.save();

        if (!comments || comments === '') {
            comments = `${avenue} Av ${street}, Zona ${zone} ${department.name}, ${country.name}`;
        }

        const location = await Location.create({
            zone,
            avenue,
            street,
            comments,
            country: country._id.toString(),
            department: department._id.toString()
        });
        await location.save();

        logService.saveLog(req, `Registró nueva ubicación ${comments} en el sistema`);

        res.json(location);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al registrar la ubicación ${e}` });
    }
}

exports.findLocations = async (_, res, next) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (e) {
        return next({ statusCode: 500, message: `Error al obtener el listado de ubicaciones ${e}` });
    }
}
