const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Vendor = require('../models/Vendor')
const Shipper = require('../models/Shipper')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // checking if web token exists and verified
    if (token) {
        jwt.verify(token, 'user secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('login')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

// check current  user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'user secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.customer = null
                res.locals.vendor = null
                res.locals.shipper = null
                next()
            }
            else {
                console.log(decodedToken)
                let customer = await Customer.findById(decodedToken.id)
                let vendor = await Vendor.findById(decodedToken.id)
                let shipper = await shipper.findById(decodedToken.id)
                next()
            }
        })
    }
    else {
        res.locals.customer = null
        res.locals.vendor = null
        res.locals.shipper = null
        next();
    }
}

module.exports = { requireAuth, checkUser };
