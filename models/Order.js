const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
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
        required: True
    },
    totalPrice: {
        type: Number,
        required: True
    }
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;

