const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
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
      maxLength: [20, 'Maximum password length is 20 characters'],
    },
  },
  profilePicture: {
    type: String,
    required: [true, 'Please, add an image']
  },
  businessName: {
    type: String,
    unique: [true, 'Vendor with such name already exists'],
    required: [true, 'Please, enter a name'],
    minLength: [5, 'Minimum address length is 5 characters'],
  },
  businessAddress: {
    type: String,
    unique: [true, 'Vendor with such address alredy exists'],
    required: [true, 'Please, enter an address'],
    minLength: [5, 'Minimum address length is 5 characters'],
  }
});

vendorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to login users

vendorSchema.statics.login = async function (username, password) {
  const vendor = await this.findOne({ username });
  if (vendor) {
    const auth = await bcrypt.compare(password, vendor.password);
    if (auth) {
      return vendor;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;
