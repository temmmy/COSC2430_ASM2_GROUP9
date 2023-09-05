const Customer = require('../models/Customer')

// handling errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { username: ' ', password: ' ', name: ' ', address: ' ' };

    // duplication error
    if (err.code === 11000) {
        errors.username = "The username is taken"
        return errors;
    }

    return errors;
}
module.exports.signup_get = (req, res) => {
    res.render('customerREG');
}

module.exports.login_get = (req, res) => {
    res.render('customerLOG')
}

module.exports.signup_post = async (req, res) => {
    const { username, password, name, address } = req.body;
    try {
        const customer = await Customer.create({ username, password, name, address })
        res.status(201).json(customer)
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).send('Error: user not created')
    }
}

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    res.send('User login')
}

