// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Authors: 
// Nguyen Chi Nghia (s3979170)
// Tran Bao Khoi (s3926093)
// Tran Hoang Son (s3978450)
// Bui Cong Duy (s3978546)
// Hoang Quoc Dat (s3979331)
// Acknowledgement: https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp 

const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Vendor = require('../models/Vendor')
const Shipper = require('../models/Shipper')

let customer;
let vendor;
let shipper;

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
                customer = await Customer.findById(decodedToken.id)
                vendor = await Vendor.findById(decodedToken.id)
                shipper = await Shipper.findById(decodedToken.id)

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

//check who is the current user 
const checkUserCustomer = async (req, res, next) => {
    // Check if the user is a customer
    if (customer) {
        next()
    } else {
        res.redirect('/login');
    }
}

const checkUserVendor = async (req, res, next) => {
    if (vendor) {
        next()
    } else {
        res.redirect('/login');
    }
}

const checkUserShipper = async (req, res, next) => {
    if (shipper) {
        next()
    } else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth, checkUser, checkUserCustomer, checkUserVendor, checkUserShipper };
