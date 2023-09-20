const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://temmmy:bog132435@users.usjmsq0.mongodb.net/e-commerce?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('homepage'));
app.get('/about', (req, res) => res.render('about'));
app.get('/copyright', (req, res) => res.render('copyright'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/help', (req, res) => res.render('help'));

app.get('/my-account', requireAuth, (req, res) => res.render('myAccount'));
// Customer Pages
app.get('/products', requireAuth, (req, res) => res.render('customerProducts'));
app.get('/product-details', requireAuth, (req, res) => res.render('customerProductDetails'));

// Vendor Pages
app.get('/my-products', requireAuth, (req, res) => res.render('vendorViewProduts'));
app.get('/add-products', requireAuth, (req, res) => res.render('vendorAddProducts'));

// Shipper Pages
app.get('/shipperOrders', requireAuth, (req, res) => res.render('customerProducts'));

app.get('/shipperREG', (req, res) => res.render('shipperREG'));
app.get('/customerREG', (req, res) => res.render('customerREG'));
app.get('/vendorREG', (req, res) => res.render('vendorREG'));
app.get('/login', (req, res) => res.render('LOG'));
app.get('/customerLOG', (req, res) => res.render('LOG'));
app.get('/vendorLOG', (req, res) => res.render('LOG'));
app.get('/shipperLOG', (req, res) => res.render('LOG'));
app.use(authRoutes);
