const Customer = require('../models/Customer')
const jwt = require('jsonwebtoken')

// handling errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { username: ' ', password: ' ', name: ' ', address: ' ', businessName: ' ', businessAddress: ' ' };


    if (err.message === 'incorrect username') {
        errors.username = 'The username is not registered'
    }
    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect'
    }
    // validation error
    if (err.message.includes('customer validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    // duplication error
    if (err.code === 11000) {
        errors.username = "The username is taken"
        return errors;
    }

    return errors;
}
module.exports.customer_signup_get = (req, res) => {
    res.render('customerREG');
}

module.exports.customer_login_get = (req, res) => {
    res.render('customerLOG')
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

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/');
}
