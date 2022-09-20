const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')
require("dotenv").config();

//DB
let userDB = process.env.DB_USER
let passwordDB = process.env.DB_PASS

//models
const User = require("./models/Users");

const app = express()

//configs
app.use(express.static('./public'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars' )

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

//public routes
app.get('/', (req, res)=>{
    res.render('home')
})

//cadastro
app.get('/create', (req,res)=>{
    res.render('create')
})

app.post('/create', (req,res)=>{

    let body = req.body

    console.log(body)

    
    res.redirect('/')

   
})

//login




//private routes
// ver livros disponiveis 
//editar livros
//deletar livros


mongoose.connect(`mongodb+srv://${userDB}:${passwordDB}@cluster0.9dzfvkp.mongodb.net/?retryWrites=true&w=majority`)
.then(
    app.listen(3000, ()=>{
        console.log('Conectado no DB e online')
    }))
.catch((error)=>console.log(error))
