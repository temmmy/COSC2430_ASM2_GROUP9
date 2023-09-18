const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware')

const app = express()


// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

// database connection 
const dbURI = 'mongodb+srv://temmmy:bog132435@users.usjmsq0.mongodb.net/e-commerce?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('homepage'))
app.get('/productsPage', requireAuth, (req, res) => res.render('customerProducts'))
app.get('/shipperREG', (req, res) => res.render('shipperREG'))
app.get('/customerREG', (req, res) => res.render('customerREG'))
app.get('/vendorREG', (req, res) => res.render('vendorREG'))
app.get('/login', (req, res) => res.render('LOG'))
app.get('/customerLOG', (req, res) => res.render('LOG'))
app.get('/vendorLOG', (req, res) => res.render('LOG'))
app.get('/shipperLOG', (req, res) => res.render('LOG'))
app.use(authRoutes)
