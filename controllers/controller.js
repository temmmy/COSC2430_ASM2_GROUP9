const Customer = require('../models/Customer');
const Shipper = require('../models/Shipper');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const fs = require('fs');

// handling general errors for both users and product
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        username: ' ',
        password: ' ',
        name: ' ',
        address: ' ',
        businessName: ' ',
        businessAddress: ' ',
        shipperName: ' ',
        distributionHub: ' ',
        artistName: ' ',
        description: ' ',
        price: ' ',
    };

    if (err.message === 'incorrect username') {
        errors.username = 'The username is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect';
    }
    // validation error
    if (err.message.includes('product validation failed')) {
        errors.price = 'Incorrect format for the price';
    }

    if (err.message.includes('CastError: Cast to Number')) {
        errors.price = 'Incorrect format for the price';
    }

    // duplication error
    if (err.code === 11000) {
        if (Object.keys(err.keyPattern)[0] == 'username') {
            errors[Object.keys(err.keyPattern)[0]] = 'The username is already registered';
        } else {
            errors[Object.keys(err.keyPattern)[0]] = 'It is already taken';
        }
        return errors;
    }
    return errors;
};

module.exports.customer_signup_get = (req, res) => {
    res.render('customerREG');
};

module.exports.customer_login_get = (req, res) => {
    res.render('LOG');
};

module.exports.shipper_signup_get = (req, res) => {
    res.render('shipperREG');
};

module.exports.shipper_login_get = (req, res) => {
    res.render('LOG');
};

module.exports.vendor_signup_get = (req, res) => {
    res.render('vendorREG');
};

module.exports.vendor_login_get = (req, res) => {
    res.render('LOG');
};

module.exports.homepage_get = (req, res) => {
    res.render('homepage');
};

const maxAge = 60 * 60 * 24 * 7;
const createToken = (id) => {
    return jwt.sign({ id }, 'user secret', {
        expiresIn: maxAge,
    });
};

// POST requests for Customer
module.exports.customer_signup_post = async (req, res) => {
    const { username, password, name, address } = req.body;
    console.log(req.body);
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const profilePicture = `${formattedDate}-${req.file.originalname}`;
    try {
        const customer = await Customer.create({ username, password, profilePicture, name, address });
        const token = createToken(customer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ customer: customer._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.customer_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.login(username, password);
        const token = createToken(customer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ customer: customer._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

//POST requests for Shipper
module.exports.shipper_signup_post = async (req, res) => {
    const { username, password, shipperName, distributionHub } = req.body;
    console.log(req.body);
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const profilePicture = `${formattedDate}-${req.file.originalname}`;
    try {
        const shipper = await Shipper.create({
            username,
            password,
            profilePicture,
            shipperName,
            distributionHub,
        });
        const token = createToken(shipper._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ shipper: shipper._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.shipper_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const shipper = await Shipper.login(username, password);
        const token = createToken(shipper._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ shipper: shipper._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

//POST requests for Vendor
module.exports.vendor_signup_post = async (req, res) => {
    const { username, password, businessName, businessAddress } = req.body;
    console.log(req.body);
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const profilePicture = `${formattedDate}-${req.file.originalname}`;
    try {
        const vendor = await Vendor.create({
            username,
            password,
            profilePicture,
            businessName,
            businessAddress,
        });
        const token = createToken(vendor._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ vendor: vendor._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.vendor_login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const vendor = await Vendor.login(username, password);
        const token = createToken(vendor._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ vendor: vendor._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.vendor_add_product_post = async (req, res) => {
    const { name, artistName, description, price } = req.body;
    console.log(req.body);
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const image = `${formattedDate}-${req.file.originalname}`;
    const token = req.cookies.jwt;
    jwt.verify(token, 'user secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            next();
        } else {
            let vendor = decodedToken.id;
            try {
                const product = await Product.create({
                    name,
                    artistName,
                    description,
                    price,
                    image,
                    vendor,
                });
                res.status(201).json({ product: product._id });
            } catch (err) {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        }
    });
};

module.exports.vendor_delete_product_get = async (req, res) => {
    try {
        let id = req.params.id;
        const result = await Product.findByIdAndRemove(id);

        if (result && result.image !== '') {
            try {
                fs.unlinkSync('./public/images/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        res.redirect("/myProducts")
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
}

module.exports.vendor_edit_product_post = async (req, res) => {
    try {
        const { name, artistName, description, price, oldImage } = req.body;
        const id = req.params.id
        console.log(req.body);
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        let image;
        if (req.file) {
            image = `${formattedDate}-${req.file.originalname}`;
            try {
                fs.unlinkSync('./public/images/' + oldImage);
            } catch (err) {
            }
            try {
                const result = await Product.findByIdAndUpdate(id, {
                    name: name,
                    artist: artistName,
                    description: description,
                    price: price,
                    image: image
                });
                res.status(201).json({ product: " " })
            } catch {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        }
        else {
            const result = await Product.findByIdAndUpdate(id, {
                name: name,
                artist: artistName,
                description: description,
                price: price,
            });
            res.status(201).json({ product: " " })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while editing the product' });
    }
}
// }

module.exports.customer_add_to_cart_post = (req, res) => {
    const product_id = req.body.product_id
    const product_name = req.body.product_name
    const product_price = req.body.product_price

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let count = 0;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].product_id === product_id) {
            req.session.cart[i].quantity += 1;
            count++;
        }
    }
    if (count === 0) {
        const cart_data = {
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            quantity: 1
        };
        req.session.cart.push(cart_data);
    }

    res.redirect("/shoppingCart")
}

module.exports.customer_remove_item_get = (req, res) => {
    const product_id = req.params.id;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].product_id === product_id) {
            req.session.cart.splice(i, 1);
        }
    }
    res.redirect("/shoppingCart")
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    console.log
    req.session.destroy(function (err) {
        // cannot access session here
    })
    res.redirect('/');
};
