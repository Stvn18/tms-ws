const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const countrySchema = new Schema({
    code: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'countries',
    timestamps: true
})

module.exports = mongoose.model('Country', countrySchema)
