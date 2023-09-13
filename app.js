const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const { requireAuth } = require('./middleware/authMiddleware')

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

// Creating Storage for saving Images

const Storage = multer.diskStorage({
    destination: 'public/images/profilePicture',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const Upload = multer({
    storage: Storage
}).single('file')

app.listen(4000)

// routes
app.get('/', (req, res) => res.render('homepage'))
app.get('/homepage', requireAuth, (req, res) => res.render('customerProducts'))
app.get('/shipper', (req, res) => res.render('shipperREG'))
app.use(authRoutes)
