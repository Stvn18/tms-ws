'use strict';

const jwt = require('jsonwebtoken');
const AccessToken = require('../models/AccessToken');
const { authConfig } = require('../config/app');

exports.validateToken = (req, _, next) => {
    const token = req.headers['authorization'];
    if ( token ) {
        AccessToken.findOne({ value: token }, (error, tk) => {
            if ( error || !tk ) return next({statusCode: 401, message: 'Unauthorized'});

            jwt.verify(token, authConfig.key, (err, decoded) => {
                if ( err ) {
                    return next({statusCode: 401, message: 'Token inválido'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        });
    } else {
        return next({statusCode: 401, message: 'Unauthorized'});
    }
}
