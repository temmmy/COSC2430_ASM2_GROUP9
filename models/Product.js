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

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name of your vinyl'],
    unique: [true, 'Record with such name already exists'],
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
        return /^[0-9]*(\.[0-9]+)?$/.test(value);
      },
      message: 'Price should only contain numbers',
    },
    type: Number,
  },
  image: {
    type: String,
    required: [true, 'Please add an image'],
  },

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
