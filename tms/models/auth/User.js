const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    enable: {
        type: Boolean,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
