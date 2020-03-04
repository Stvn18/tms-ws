'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/auth/User');
const AccessToken = require('../../models/auth/AccessToken');
const Log = require('../../models/auth/Log');
const logService = require('../../services/log.service');

const { authConfig } = require('../../config/app');

exports.authenticateUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({ email: userData.email }, (err, user) => {
        if ( err ) return next(err)

        if ( !user ) {
            return next({ statusCode: 404, message: 'No existe el usuario ingresado' })
        } else {
            const expiresInData = 2 * 60 * 60; // 2 Horas de expiración

            if ( bcrypt.compareSync(userData.password, user.password) ) {
                const token = jwt.sign({ id: user.id }, authConfig.key, { expiresIn: expiresInData })

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: token,
                    expiresIn: expiresInData
                };

                AccessToken.create({
                    value: token,
                    expiration: expiresInData
                }, (errorToken, tokenSaved) => {
                    if ( errorToken || !tokenSaved ) {
                        return next({
                            statusCode: 400,
                            message: 'Error al iniciar sesión'
                        });
                    }

                    res.json(dataUser);
                });
            } else {
                return next({ statusCode: 401, message: 'Contraseña Incorrecta' });
            }
        }
    });
}

exports.logout = (req, res, next) => {
    AccessToken.findOneAndDelete({
        value: req.headers['authorization']},
        (err, resp) => {
            if( err ) return next({ statusCode: 400, message: 'Error al eliminar la sesión' });

            logService.saveLog(req, 'Se ha deslogueado del sistema');
            return res.json(resp);
        });
}

exports.getLogs = (_, res, next) => {
    Log.find((err, logs) => {
        if ( err ) return next({ statusCode: 400, message: 'Error al obtener la bitácora' });
        return res.json(logs);
    });
}
