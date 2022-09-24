const mongoose = require('mongoose')

const Books = mongoose.model('Book', {
    name:String,
    author:String,
    pages:Number,
    synopsis:String,
    
    
})

module.exports = Books