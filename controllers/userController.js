const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  // Create the Multer upload instance
const upload = multer({ storage });

//-----------------1-----------------//

// Controller methods
exports.checkAuthentication = (req, res, next) => {
    if (!req.session.loggedIn) {
      return res.redirect('/login.html');
    }
    next();
  };

//----------------2------------//
exports.checkAccountStatus = (req, res, next) => {
    const email = req.session.email;
  
    User.findOne({ email })
      .then(user => {
        if (!user || !user.isActive) {
          return res.status(401).send("Your account has been deactivated. Click <a href='/reactivate-account'>here</a> to reactivate your account.");
        }
        next();
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };

//-----------------3---------------------//

exports.handleLogin = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).send("Invalid email or password.");
        }
  
        if (!user.isActive) {
          return res.status(401).send("Your account has been deactivated. Click <a href='/reactivate-account'>here</a> to reactivate your account.");
        }
  
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return res.status(500).send("An error occurred while comparing passwords");
          }
  
          if (result) {
            req.session.loggedIn = true;
            req.session.email = email;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            return res.render('homepage', { user });
          } else {
            return res.status(401).send("Invalid email or password.");
          }
        });
      })
      .catch(err => {
        console.error("Error during login:", err);
        res.status(500).send("An error occurred during login");
      });
  };
  

//----------------------4----------------------//

exports.handleRegistration = (req, res) => {
    const { email } = req.body;
  
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).send("This email has already been registered");
        }
  
        const myData = new User(req.body);
        myData.save()
          .then(item => {
            const response = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
                <p>You have been registered!</p>
                <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
              </div>
            `;
            res.send(response);
          })
          .catch(err => {
            res.status(400).send("Unable to register.");
          });
      })
      .catch(err => {
        console.error("Error during user lookup:", err);
        res.status(500).send("An error occurred during user lookup");
      });
  };


//---------------------5-----------------------//

exports.handleForgotPassword = (req, res) => {
    const { email } = req.body;
  
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).send("User not found.");
        }
  
        user.resetToken = resetToken;
        user.save()
          .then(() => {
            sendPasswordResetEmail(user.email, resetToken);
            const response = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
                <p>Password reset link sent to your email.</p>
                <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
              </div>
            `;
            res.send(response);
          })
          .catch(err => {
            console.error("Error storing reset token:", err);
            res.status(500).send("An error occurred while storing the reset token.");
          });
      })
      .catch(err => {
        console.error("Error during user lookup:", err);
        res.status(500).send("An error occurred during user lookup");
      });
  };


  //--------------------------6----------------------//

  exports.handleResetPassword = (req, res) => {
    const { email, resetToken, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      const response = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
          <p>Passwords do not match.</p>
          <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
        </div>
      `;
      return res.status(400).send(response);
    }
  
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).send("An error occurred while resetting the password");
      }
  
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("An error occurred while resetting the password");
        }
  
        User.findOneAndUpdate(
          { email },
          { password: hash },
          { new: true }
        )
          .then(updatedUser => {
            if (!updatedUser) {
              const response = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
                  <p>User not found.</p>
                  <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
                </div>
              `;
              return res.status(404).send(response);
            }
            const response = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
                <p>Password successfully reset!</p>
                <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
              </div>
            `;
            res.send(response);
          })
          .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).send("An error occurred while resetting the password");
          });
      });
    });
  };

//--------------------7------------------//

exports.handleProfileView = (req, res) => {
    const { email } = req.query;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).send("User not found.");
        }
  
        const folderPath = user.resumeDetails && user.resumeDetails.fileName ? user.resumeDetails.folderPath : '';
        const fileName = user.resumeDetails && user.resumeDetails.fileName ? user.resumeDetails.fileName : '';
        const resumeURL = user.resumeDetails ? path.join(folderPath, fileName) : null;
  
        res.render('profile', { user, resumeURL });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };


//---------------------------8----------------------//

exports.handleResumeUpload = (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file was uploaded.');
    }
  
    const fileDetails = {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      uploadDate: new Date(),
      folderPath: req.file.destination,
    };
  
    User.findOne({ email: req.session.email })
      .then(user => {
        if (!user) {
          return res.status(404).send("User not found.");
        }
  
        if (user.resumeDetails && user.resumeDetails.fileName) {
          const oldResumePath = path.join(user.resumeDetails.folderPath, user.resumeDetails.fileName);
          fs.unlink(oldResumePath, err => {
            if (err) {
              console.error('Error deleting old resume file:', err);
            }
          });
        }
  
        user.resumeDetails = fileDetails;
        user.save()
          .then(updatedUser => {
            const successMessage = 'Resume uploaded and user document updated successfully!';
            res.render('resume-upload', { email: req.session.email, successMessage });
          })
          .catch(err => {
            console.error('Error updating user document:', err);
            res.status(500).send('An error occurred while updating user document.');
          });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };
  

  