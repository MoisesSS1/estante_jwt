const mongoose = require('mongoose')

const Books = mongoose.model('Book', {
    name:String,
    pages:Number,
    introduction:String,
    author:String,
})

module.exports = Books