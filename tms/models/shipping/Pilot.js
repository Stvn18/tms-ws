const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const pilotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String
    },
    identification: {
        type: String,
        required: true,
        trim: true
    },
    licenceType: {
        type: String,
        required: true
    }
}, {
    collection: 'pilots',
    timestamps: true
})

module.exports = mongoose.model('Pilot', pilotSchema)
