const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')

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









app.listen(3000, ()=>{
    console.log('Servidor on')
})