<<<<<<< HEAD
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

mongoose.connect("mongodb://localhost:27017/user_data", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  resumePath: String,
});

const User = mongoose.model("User", userSchema);

// Multer configuration to store the uploaded resumes in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File type filter to accept only PDF files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.pdf'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'));
  }
};


const upload = multer({ storage: storage });

// Serving the index.html page for uploading the resume
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'resume-upload.html'));
});

// POST endpoint to handle the resume upload
app.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  // Store the uploaded resume path in the database
  const resumePath = req.file.path;
  const user = new User({ resumePath });

  user.save()
    .then(() => {
      res.send('Resume uploaded successfully!');
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).send("An error occurred while saving the user.");
    });
});

// Error handling middleware to display user-friendly error messages
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error
    return res.status(400).send('Invalid file format. Only PDF files are allowed.');
  } else if (err) {
    // Other errors
    return res.status(500).send('Something went wrong.');
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
=======
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

mongoose.connect("mongodb://localhost:27017/user_data", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  resumePath: String,
});

const User = mongoose.model("User", userSchema);

// Multer configuration to store the uploaded resumes in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File type filter to accept only PDF files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.pdf'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'));
  }
};


const upload = multer({ storage: storage });

// Serving the index.html page for uploading the resume
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'resume-upload.html'));
});

// POST endpoint to handle the resume upload
app.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  // Store the uploaded resume path in the database
  const resumePath = req.file.path;
  const user = new User({ resumePath });

  user.save()
    .then(() => {
      res.send('Resume uploaded successfully!');
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).send("An error occurred while saving the user.");
    });
});

// Error handling middleware to display user-friendly error messages
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error
    return res.status(400).send('Invalid file format. Only PDF files are allowed.');
  } else if (err) {
    // Other errors
    return res.status(500).send('Something went wrong.');
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
>>>>>>> bb331430285006e0ea562773fc31276d07ed994d
