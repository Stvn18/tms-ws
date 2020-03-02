const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const shippingSchema = new Schema({
    trunk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trunk'
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    status: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentType: {
        type: Number,
        required: true
    },
    phoneReference: {
        type: String,
        required: true
    },
    quantityPackages: {
        type: Number,
        required: true
    },
    packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
}, {
        collection: 'shippings',
        timestamps: true
    })

module.exports = mongoose.model('Shipping', shippingSchema)
