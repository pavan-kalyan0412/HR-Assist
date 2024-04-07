const mongoose = require('mongoose');

// Define admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;