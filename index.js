// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Authors:
// Nguyen Chi Nghia(s3979170)
// Tran Bao Khoi(s3926093)
// Tran Hoang Son(s3978450)
// Bui Cong Duy(s3978546)
// Hoang Quoc Dat(s3979331)
// Acknowledgement: https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const session = require('express-session');
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
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// using session to implement shopping cart
app.use(
  session({
    secret: 'user secret',
    cookie: { maxAge: 60 * 60 * 24 * 24 * 7 },
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://temmmy:bog132435@users.usjmsq0.mongodb.net/e-commerce?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// For every route the status of current user will be cheked
app.get('*', checkUser);

// Homepage
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('homepage', { products: products });
    if (!products) {
      return res.status(404).render('error404');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// For everyone
app.get('/myAccount', requireAuth, async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'user secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        customer = await Customer.findById(decodedToken.id);
        vendor = await Vendor.findById(decodedToken.id);
        shipper = await Shipper.findById(decodedToken.id);
        if (customer) {
          res.render('myAccount', { customer: customer });
        } else if (vendor) {
          res.render('myAccount', { vendor: vendor });
        } else {
          res.render('myAccount', { shipper: shipper });
        }
      }
    });
  }
});
// Customer Pages
app.get('/productsPage', requireAuth, checkUserCustomer, async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  try {
    const products = await Product.find();
    res.render('customerProducts', { products: products, cart: req.session.cart });
    if (!products) {
      // Handle the case where the product doesn't exist
      return res.status(404).render('error404');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/productDetailPage/:productId', requireAuth, checkUserCustomer, async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      // Handle the case where the product doesn't exist
      return res.status(404).render('error404');
    }
    res.render('customerProductDetails', { product: product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/shoppingCart', requireAuth, checkUserCustomer, async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.render('customerShoppingCart', { cart: req.session.cart });
});

app.get('/orderConfirmation', requireAuth, checkUserCustomer, (req, res) => res.render('thankYou'));

// Vendor Pages
app.get('/myProducts', requireAuth, checkUserVendor, async (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, 'user secret', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      next();
    } else {
      let vendor = decodedToken.id;
      try {
        const products = await Product.find({ vendor: vendor });
        res.render('vendorViewProducts', { products: products });
        if (!products) {
          // Handle the case where the product doesn't exist
          return res.status(404).render('error404');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

// Shipper Pages
app.get('/shipperOrders', requireAuth, checkUserShipper, async (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, 'user secret', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      next();
    } else {
      let id = decodedToken.id;
      try {
        const shipper = await Shipper.findById(id);
        const orders = await Order.find({ distributionHub: shipper.distributionHub });
        res.render('shipperOrders', { orders: orders });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

// Genereal Pages
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

// Other Pages
app.use((req, res) => {
  res.status(404).render('404');
});
