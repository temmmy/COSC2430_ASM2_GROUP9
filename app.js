const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express()


// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

// database connection 
const dbURI = 'mongodb+srv://temmmy:bog132435@users.usjmsq0.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.listen(4000)

// routes
app.get('/', (req, res) => res.render('homepage'))
app.get('/shipper', (req, res) => res.redner('shipperREG'))
app.use(authRoutes)
