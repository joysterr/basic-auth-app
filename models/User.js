const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, minLength: 3 },
    password: { type: String, required: true, minLength: 3 }
})

module.exports = mongoose.model('user', userSchema)