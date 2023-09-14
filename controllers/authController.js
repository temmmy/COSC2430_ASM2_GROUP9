const Customer = require('../models/Customer')
const Shipper = require('../models/Shipper')
const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')

// handling general errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { username: ' ', password: ' ', name: ' ', address: ' ', businessName: ' ', businessAddress: ' ', shipperName: ' ', distributionHub: ' ' };


    if (err.message === 'incorrect username') {
        errors.username = 'The username is not registered'
    }
    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect'
    }
    // validation error
    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    // duplication error
    if (err.code === 11000) {
        if ((Object.keys(err.keyPattern)[0]) == 'username') {
            errors[Object.keys(err.keyPattern)[0]] = "The username is already registered"
        }
        else {
            errors[Object.keys(err.keyPattern)[0]] = "It is already taken"
        }
        return errors;
    }
    return errors;
}


module.exports.customer_signup_get = (req, res) => {
    res.render('customerREG');
}

module.exports.customer_login_get = (req, res) => {
    res.render('LOG')
}

module.exports.shipper_signup_get = (req, res) => {
    res.render('shipperREG')
}

module.exports.shipper_login_get = (req, res) => {
    res.render('LOG')
}

module.exports.vendor_signup_get = (req, res) => {
    res.render('vendorREG')
}

module.exports.vendor_login_get = (req, res) => {
    res.render('LOG')
}

module.exports.homepage_get = (req, res) => {
    res.render('homepage')
}

const maxAge = 60 * 60 * 24 * 7;
const createToken = (id) => {
    return jwt.sign({ id }, 'customer secret', {
        expiresIn: maxAge
    })
}

// POST requests for Customer
module.exports.customer_signup_post = async (req, res) => {
    const { username, password, name, address } = req.body;
    console.log(req.body);
    const profilePicture = req.file.path;
    try {
        const customer = await Customer.create({ username, password, profilePicture, name, address })
        const token = createToken(customer._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ customer: customer._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.customer_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.login(username, password)
        const token = createToken(customer._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ customer: customer._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

//POST requests for Shipper
module.exports.shipper_signup_post = async (req, res) => {
    const { username, password, shipperName, distributionHub } = req.body;
    console.log(req.body);
    const profilePicture = req.file.path;
    try {
        const shipper = await Shipper.create({ username, password, profilePicture, shipperName, distributionHub })
        const token = createToken(shipper._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ shipper: shipper._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.shipper_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const shipper = await Shipper.login(username, password)
        const token = createToken(shipper._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ shipper: shipper._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

//POST requests for Vendor
module.exports.vendor_signup_post = async (req, res) => {
    const { username, password, businessName, businessAddress } = req.body;
    console.log(req.body);
    const profilePicture = req.file.path;
    try {
        const vendor = await Vendor.create({ username, password, profilePicture, businessName, businessAddress })
        const token = createToken(vendor._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ vendor: vendor._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.vendor_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const vendor = await Vendor.login(username, password)
        const token = createToken(vendor._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ customer: vendor._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/');
}
