const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const packageSchema = new Schema({
    weight: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    fragile: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    }
}, {
    collection: 'packages',
    timestamps: true
})

module.exports = mongoose.model('Package', packageSchema)
