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
const bcrypt = require('bcryptjs')

const shipperSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: [true, 'This username already exists'],
        minLength: [8, 'Minimum username length is 8 characters'],
        maxLength: [15, 'Maximum username length is 15 characters'],
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        validate: {
            validator: function (value) {
                // Regular expression to match at least one special character
                return /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            message: 'Password must contain at least one special character',
            minLength: [8, 'Minimum password length is 8 characters'],
            maxLength: [20, 'Maximum password length is 20 characters']
        }
    },
    profilePicture: {
        type: String
    },
    shipperName: {
        type: String,
        required: [true, 'Please, enter a name'],
        minLength: [5, 'Minimum name length is 5 characters']
    },
    distributionHub: {
        type: String,
        required: [true, 'Please, select a distribution hub']
    }
});

shipperSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// method to login users

shipperSchema.statics.login = async function (username, password) {
    const shipper = await this.findOne({ username })
    if (shipper) {
        const auth = await bcrypt.compare(password, shipper.password)
        if (auth) {
            return shipper
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect username')
}

const Shipper = mongoose.model('shipper', shipperSchema);

module.exports = Shipper;