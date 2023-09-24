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

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
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

