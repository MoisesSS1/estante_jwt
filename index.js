const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')
require("dotenv").config();

//DB
let userDB = process.env.DB_USER
let passwordDB = process.env.DB_PASS

//models
const Users = require("./models/Users");
const Books = require('./models/Books')

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
//home
app.get('/', (req, res)=>{
    res.render('home')
})

//Create books
app.get('/insertbook', (req,res)=>{
    res.render('insertbook')
})

app.post('/insertbook', (req,res)=>{

    const {name, author,pages, synopsis } = req.body

    const newBook =  {name, author, pages, synopsis}

    try{
        Books.create(newBook)
        res.redirect('/')

    }catch(error){
        console.log(error)
    }
})

//Create User
app.get('/createUser', (req,res)=>{
    res.render('createUser')
})
app.post('/createUser', (req,res)=>{

    const { login, password , email } = req.body
    
    const newUser = {login, password, email}

    try{

        Users.create(newUser)

    }catch(error){
        console.log(error)
    }
    res.redirect('/')

   
})

//login
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login', async (req,res)=>{

    const {email, password} = req.body

    let userDB = await Users.findOne({email})

    //validações
    if(!userDB){

        res.redirect('/login')
        return console.log('Usuario nao existe!')
    }

    if(userDB && userDB.password === password){

        res.redirect('/showbooks')
        return console.log('Usuario e senha corretos!')
    }

    if(userDB && userDB.password !== password){

        res.redirect('/login')
        return console.log('Senha incorreta!')
    }

    res.redirect('/showbooks')
})



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
