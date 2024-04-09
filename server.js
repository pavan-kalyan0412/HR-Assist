
const express = require("express");
const port = 3000;
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./models/User');
const admin = require('./models/admin')

const userRoutes = require('./routes/userRoutes');


// Use express-session middleware
app.use(
  session({
    secret: 'yoursecuresecret',
    resave: false,
    name:'uniqueSessionID',
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
    }
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/', userRoutes);

mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    // Create an index on the 'email' field to improve query performance
    User.collection.createIndex({ email: 1 });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });







// app.get('/*', (_req, res) => {
//   // Redirect to the login page
//   res.redirect('/login.html');
// });

// app.use((req, res) => {
//   res.redirect('/login.html');
// });


// Add the following middleware to disable caching for all responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});