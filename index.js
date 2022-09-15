const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {engine} = require('express-handlebars')

const app = express()

//configs
app.use(express.json())

app.use(express.static('./public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req, res)=>{

    res.render('home')
})







app.listen(3000, ()=>{
    console.log('Servidor on')
})