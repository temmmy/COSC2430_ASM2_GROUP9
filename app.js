const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {
  requireAuth,
  checkUser,
  checkUserCustomer,
  checkUserVendor,
  checkUserShipper,
} = require('./middleware/authMiddleware');
const Product = require('./models/Product');
const Vendor = require('./models/Vendor');
const Shipper = require('./models/Shipper');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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

app.get('/myAccount', requireAuth, (req, res) => res.render('myAccount'));
// Customer Pages
app.get('/productsPage', requireAuth, checkUserCustomer, (req, res) =>
  res.render('customerProducts')
);
app.get('/productDetailPage', requireAuth, checkUserCustomer, (req, res) =>
  res.render('customerProductDetails')
);

// Vendor Pages
app.get('/myProducts', requireAuth, checkUserVendor, async (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, 'user secret', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      next();
    } else {
      let vendor = decodedToken.id;
      const products = await Product.find({ vendor: vendor });
      res.render('vendorViewProducts', { products: products });
    }
  });
});

// Shipper Pages
app.get('/shipperOrders', requireAuth, checkUserShipper, (req, res) => res.render('shipperOrders'));

app.get('/', (req, res) => res.render('homepage'));
app.get('/about', (req, res) => res.render('about'));
app.get('/copyright', (req, res) => res.render('copyright'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/help', (req, res) => res.render('help'));
app.get('/shipperREG', (req, res) => res.render('shipperREG'));
app.get('/customerREG', (req, res) => res.render('customerREG'));
app.get('/vendorREG', (req, res) => res.render('vendorREG'));
app.get('/login', (req, res) => res.render('LOG'));
app.get('/customerLOG', (req, res) => res.render('LOG'));
app.get('/vendorLOG', (req, res) => res.render('LOG'));
app.get('/shipperLOG', (req, res) => res.render('LOG'));
app.use(routes);
