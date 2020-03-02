const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
}, {
    collection: 'departments',
    timestamps: true
})

module.exports = mongoose.model('Department', departmentSchema)
