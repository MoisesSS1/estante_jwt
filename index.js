const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')
require("dotenv").config();

//DB
let userDB = process.env.DB_USER
let passwordDB = process.env.DB_PASS
let secret = process.env.SECRET

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
        res.redirect('/insertbook')

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
    if(userDB && userDB.password === password){
        //autenticaçao
        const id = userDB._id
        const token = jwt.sign({id}, secret)

        res.redirect(`/showbooks:${token}`)
    }

    if(!userDB){
        res.status(401).json({msg:"Usuario nao existe!"})
    }

    if(userDB && userDB.password !== password){
        res.status(401).json({msg:"Senha incorreta!"})
    }

})

//PRIVATE ROUTES

//authorization
function verifyJWT(req,res,next) {

    const params = req.params.id

    const token = params.replace(':','')
    
    if(!token){
        res.status(401).json({msg:'Nao possui token'})
    }

    try{

        jwt.verify(token, secret)
        next()

     } catch(error){
        res.status(404).json({msg:"Erro ao validar o token"})
     }    
}


// ver livros disponiveis 

app.get('/showbooks:id', verifyJWT ,async (req,res)=>{
    const books = await Books.find().lean()


    res.render('showbooks', {books})
})



//Conect DB
mongoose.connect(`mongodb+srv://${userDB}:${passwordDB}@cluster0.9dzfvkp.mongodb.net/?retryWrites=true&w=majority`)
.then(
    app.listen(3000, ()=>{
        console.log('Conectado no DB e online')
    }))
.catch((error)=>console.log(error))
