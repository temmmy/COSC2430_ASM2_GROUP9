const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: [{

        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        product_name: {
            type: String,
            required: true,
        },
        product_price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
    status: {
        type: String,
        required: true
    },
    distributionHub: {
        type: String,
        enum: ['Hanoi', 'Ho Chi Minh', 'Da Nang'],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;

