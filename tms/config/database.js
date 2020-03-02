const mongoose = require('mongoose');
const { dataBaseConfig } = require('./app');

module.exports = () => {
    mongoose
        .connect(dataBaseConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connected'))
        .catch(error => console.log(`Could not connect ${ error }`))
}
