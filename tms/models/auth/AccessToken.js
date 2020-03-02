const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const accessTokenSchema = new Schema({
    value: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    expiration: {
        type: Number,
        required: true
    }
}, {
    collection: 'tokens'
})

module.exports = mongoose.model('AccessToken', accessTokenSchema)
