const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: true,
        minLength: [8, 'Minimum username length is 8 characters'],
        maxLength: [15, 'Maximum username length is 15 characters'],
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        specialChar: true,
        minLength: [8, 'Minimum password length is 8 characters'],
        maxLength: [20, 'Maximum password length is 20 characters']
    },
    name: {
        type: String,
        required: [true, "Please, enter a name"],
        minLength: [5, 'Minimum address length is 5 characters']
    },
    address: {
        type: String,
        required: [true, "Please, enter an address"],
        minLength: [5, 'Minimum address length is 5 characters']
    }
});

customerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// method to login users

customerSchema.statics.login = async function (username, password) {
    const customer = await this.findOne({ username })
    if (customer) {
        const auth = await bcrypt.compare(password, customer.password)
        if (auth) {
            return customer
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect username')
}

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;