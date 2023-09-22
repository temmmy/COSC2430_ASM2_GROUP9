const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of your vinyl'],
        unique: [true, 'Record with such name already exists']
    },
    artistName: {
        type: String,
        required: ['Please enter the name of the artists'],
    },
    description: {
        type: String,
        required: [true, 'Describe your product'],
    },
    price: {
        required: [true, 'Please enter the price in dollars'],
        validate: {
            validator: function (value) {
                // Regular expression to check if the value is a valid number with an optional decimal point
                return /^[0-9]*(\.[0-9]+)?$/.test(value)
            },
            message: 'Price should only contain numbers'
        },
        type: Number,
    },
    image: {
        type: String,
        required: [true, 'Please, add an image'],
    },

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;