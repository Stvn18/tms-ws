'use strict';

const Location = require('../../models/common/Location');
const Country = require('../../models/common/Country');
const Department = require('../../models/common/Department');
const logService = require('../../services/log.service');

exports.createLocation = async (req, res, next) => {
    if (!req.body) return next({ statusCode: 400, message: 'Datos incompletos' });
    try {

        const { zone, avenue, street } = req.body;
        let { comments } = req.body;

        if (!req.body.country) return next({ statusCode: 400, message: 'Por favor seleccionar el país' });
        if (!req.body.department) return next({ statusCode: 400, message: 'Por favor seleccionar el departamento' });

        let country = await Country.findOne({ code: req.body.country.code });

        if (!country) {
            country = await Country.create(req.body.country);
            await country.save();
        }

        let department = await Department.findOne({ code: req.body.department.code });

        if (!department) {
            department = await Department.create({
                code: req.body.department.code,
                name: req.body.department.name,
                country: country._id.toString()
            });
            await department.save();
        }

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
