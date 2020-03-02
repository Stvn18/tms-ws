const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const locationSchema = new Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    zone: {
        type: Number,
        required: true
    },
    avenue: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
}, {
    collection: 'locations',
    timestamps: true
})

module.exports = mongoose.model('Location', locationSchema)
