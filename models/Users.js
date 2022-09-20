const mongoose = require('mongoose')

const Users = mongoose.model('User', {
    email:String,
    password:String,
    age:Number,
})

module.exports = Users