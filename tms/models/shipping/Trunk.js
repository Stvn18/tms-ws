const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const trunkSchema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number
    },
    pilot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pilot'
    }
}, {
    collection: 'trunks',
    timestamps: true
})

module.exports = mongoose.model('Trunk', trunkSchema)
