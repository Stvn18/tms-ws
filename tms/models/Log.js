const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const logSchema = new Schema({
    createdBy: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    collection: 'logs',
    timestamps: true
});

module.exports = mongoose.model('Log', logSchema)
