const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        enable: true
    })

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) {
            if (err.code === 11000) {
                return next({ statusCode: 400, message: 'Este correo ya se encuentra registrado' })
            } else {
                return next(err)
            }
        } else {
            res.json(user)
        }
    })
}
