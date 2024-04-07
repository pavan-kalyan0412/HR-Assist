const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Define the number of salt rounds for password hashing

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  mobileNumber: String,
  organization: String,
  experience: Number,
  skills: String,
  isActive: { type: Boolean, default: true }, // New field for account activation status
  resumeDetails: {
    fileName: String,
    originalName: String,
    uploadDate: Date,
    folderPath: String,
  },
},
{ timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', function (next) {
  const user = this;

  // Check if password is modified
  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt and hash the password
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Replace plain text password with hashed password
      user.password = hash;
      next();
    });
  });
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
