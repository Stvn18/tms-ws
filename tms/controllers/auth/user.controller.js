'use strict';

const User = require('../../models/auth/User');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res, next) => {
    if ( !req.body ) {
        return next({ statusCode: 400, message: 'Datos incompletos' });
    }

    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password),
        enable: true
    });

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) {
            if (err.code === 11000) {
                return next({ statusCode: 400, message: 'Este correo ya se encuentra registrado' });
            } else {
                return next(err);
            }
        } else {
            res.json(user);
        }
    });
}
