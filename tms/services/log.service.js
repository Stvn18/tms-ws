const jwt = require('jsonwebtoken');
const Log = require('../models/Log');
const User = require('../models/User');

module.exports.saveLog = (req, action) => {
    const tk = jwt.decode(req.headers['authorization']);

    if ( tk ) {
        User.findById(tk.id, (err, user) => {
            if (err || !user) return;

            Log.create({
                createdBy: user.email,
                description: action
            });
        });
    }
}
