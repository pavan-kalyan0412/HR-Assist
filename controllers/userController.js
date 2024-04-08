const User = require('../models/User')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
require('dotenv').config();


// Multer configuration to store the uploaded resumes in the 'uploads' directory
// const storage = multer.diskStorage({
//     destination: function (_req, _file, cb) {
//       const uploadFolder = path.join(__dirname, `uploads`);
  
//       // Create the folder if it doesn't exist
//       fs.mkdir(uploadFolder, { recursive: true }, (err) => {
//         if (err) {
//           console.error('Error creating upload folder:', err);
//         }
//         cb(null, uploadFolder);
//       });
//     },
//     filename: function (_req, file, cb) {
//       cb(null, Date.now() + '-' + path.extname(file.originalname));
//     }
//   });
  
  
//   // File type filter to accept only PDF files
//   const fileFilter = (_req, file, cb) => {
//       const allowedFileTypes = ['.pdf'];
//       const fileExtension = path.extname(file.originalname).toLowerCase();
    
//       if (allowedFileTypes.includes(fileExtension)) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only PDF files are allowed.'));
//       }
//     };
  
  
//     const upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = {
//     upload: upload
// };

// //--------------added---------------
// //app.get('/index', (_req, res) => {
exports.index = (_req, res) => {
    res.sendFile('index.html', { root: 'public' })
  };



//   //--------------added-------------
//app.post('/register', (_req, res) => {
  exports.register = (_req, res) => {
    res.sendFile('register.html', { root: 'public' })
  };



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
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(404).send("User not found.");
      }

      if (!user.isActive) {
        // Account is deactivated, show login page with deactivation message and reactivation link
        const response = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
            <p>Your account has been deactivated. Click <a href="/reactivate-account">here</a> to reactivate your account.</p>
          </div>
        `;
        return res.status(401).send(response);
      }

      // If the account is active, proceed to the next middleware or route handler
      next();
    })
    .catch(err => {
      console.error("Error fetching user data:", err);
      res.status(500).send("An error occurred while fetching user data.");
    });
}


  //---------------------added-------------------//---------get
//app.get('/home', checkAuthentication, (req, res) => {
  exports.home = (req, res) => {
    const user = {
      email: req.session.email,
      firstName: req.session.firstName, // Use the stored first name
      lastName: req.session.lastName,   // Use the stored last name
    };
    res.render('homepage', { user });
    console.log('ckdeddddddddddddddd')
  };


//-----------------added-------------
//app.get('/homepage', checkAuthentication,(req, res) => {
  exports.homepage = (req,res) =>{
    const user = { email: req.session.email };
  res.render('homepage',{user});
  };

//===================added============//
//-----------------post('/home')----------------//
exports.handleLogin = (req, res) => {
    req.session.loggedIn = true; // Set the loggedIn state in the session
    req.session.email = req.body.email; // Store user's email in the session
  const { email, password } = req.body;
  console.log("clocked on login button")

  User.findOne({ email })
    .then(user => {
      if (!user) {
        // User not found, show login page with error message
        const response = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
            <p>Invalid email or password.</p>
            <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
          </div>
        `;
        return res.status(401).send(response);
      }

      if (!user.isActive) {
        // Account is deactivated, show login page with deactivation message and reactivation link
        const response = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
            <p>Your account has been deactivated. Click <a href="/reactivate-account">here</a> to reactivate your account.</p>
          </div>
        `;
        return res.status(401).send(response);
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("An error occurred while comparing passwords");
        }

        if (result) {
          // Set the user's first name and last name in the session
          req.session.email = email;
          req.session.firstName = user.firstName; 
          req.session.lastName = user.lastName;   
          return res.render('homepage', { user });
        } else {
          // Invalid password, show login page with error message
          const response = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
              <p>Invalid email or password.</p>
              <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
            </div>
          `;
          return res.status(401).send(response);
        }
      });
    })
    .catch(err => {
      console.error("Error during login:", err);
      res.status(500).send("An error occurred during login");
    });
};

  

//----------------------4----------------------//
// ---------------------post('/addname')----------------//
exports.handleRegistration = (req, res) => {
    const { email } = req.body;
  
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).send("This email has already been registered");
        }
  
        const myData = new User(req.body);
        myData.save()
          .then(_item => {
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
            console.error(err);
          });
      })
      .catch(err => {
        console.error("Error during user lookup:", err);
        res.status(500).send("An error occurred during user lookup");
      });
  };

//-------------added------------
//app.get('/forgot-password', checkAuthentication, (_req, res) => {
exports.forgotPassword = (_req, res) => {
  res.sendFile('forgot-password.html', { root: 'public' })
  };


  
//---------------------5-----------------------//
//app.post('/forgot-password')
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

  //--------added----------
  //app.get('/reset-password', (req, res) => {
  exports.resetPassword = (req, res) => {
    const { email, token } = req.query;
  
    User.findOne({ email, resetToken: token })
      .then(user => {
        if (!user) {
          // Email and reset token do not match or user not found
          return res.status(400).send("Email and reset token do not match.");
        }
  
        // Render the reset-password.html page
        res.sendFile(__dirname + '/public//reset-password.html');
      })
      .catch(err => {
        console.error("Error validating email and reset token:", err);
        res.status(500).send("An error occurred while validating email and reset token.");
      });
  };


  //--------------------------6----------------------//
//app.post('/reset-password'--------------
  exports.handleResetPassword = (req, res) => {
    const { email, resetToken, password, confirmPassword } = req.body;
    console.log("Received Reset Password Request:", email); // Log the received email
  
     // Check if the passwords match
    if (password !== confirmPassword) {
      const response = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
          <p>Passwords do not match.</p>
          <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;" onclick="location.href='/login.html'">Login</button>
        </div>
      `;
      return res.status(400).send(response);
    }
  
    // Generate a new hashed password
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

        // Update the user's password with the new hashed password using findOneAndUpdate
      User.findOneAndUpdate(
        { email }, // Find the user by email
        { password: hash }, // Update the password with the new hashed password
        { new: true } // Return the updated user document
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
//app.get('/profile', checkAuthentication,checkAccountStatus, (req, res) => {
exports.handleProfileView = (req, res) => {
    const { email } = req.query;
  
    User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(404).send("User not found.");
      }

      // Check if user.resumeDetails and user.resumeDetails.fileName exist before accessing folderPath
      const folderPath = user.resumeDetails && user.resumeDetails.fileName ? user.resumeDetails.folderPath : '';
      const fileName = user.resumeDetails && user.resumeDetails.fileName ? user.resumeDetails.fileName : '';

      // Assuming that resumeURL is a valid URL to the uploaded resume file
      const resumeURL = user.resumeDetails ? path.join(folderPath, fileName) : null;

      // Render the profile.ejs template with the user data
      res.render('profile', { user, resumeURL });
    })
    .catch(err => {
      console.error("Error fetching user data:", err);
      res.status(500).send("An error occurred while fetching user data.");
    });
};

//----------added--------------//
//app.get('/view-resume/:fileName', checkAuthentication, (req, res) => {

exports.viewResume = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'uploads', fileName); 
    res.sendFile(filePath);
};

//---------------------------added----------------------//
//app.get('/update-profile',checkAuthentication, checkAccountStatus, (req, res) => {

exports.updateProfile = (req, res) => {
    const { email } = req.query;
  
    // Find the user in the database by email
    User.findOne({ email })
      .then(user => {
        if (!user) {
          // User not found, handle this case according to your requirement
          console.log("User not found for email:", email);
          return res.status(404).send("User not found.");
        }
  
        // Render the "update-profile.ejs" template with the user data
        res.render('update-profile', { user });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };

  //--------------added----------------//
  //app.post('/update-profile',checkAccountStatus, (req, res) => {

  exports.updateProfileDetails = (req,res) => {
    const { email, organization, experience, mobileNumber, skills } = req.body;
  
    // Find the user in the database by email
    User.findOne({ email })
      .then(user => {
        if (!user) {
          // User not found, handle this case according to your requirement
          console.log("User not found for email:", email);
          return res.status(404).send("User not found.");
        }
  
        // Update the user's details
        user.organization = organization;
        user.experience = experience;
        user.mobileNumber = mobileNumber;
        user.skills = skills;
  
        // Save the updated user details in the database
        user.save()
          .then(updatedUser => {
            // Redirect the user back to the profile page after updating
            res.redirect('/profile?email=' + encodeURIComponent(email));
            console.log(updatedUser);
          })
          .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).send("An error occurred while updating user details.");
          });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };


  //---------------------added---------------------//
  //--------resume-upload------------------------//
 //app.get('/resume-upload', checkAuthentication, checkAccountStatus, (req, res) => {
  exports.resumeUpload = (req,res)=> {
    const email = req.session.email; 
    res.render('resume-upload', { email }); 
  };

  //--------------------------------
  //app.post('/upload',checkAccountStatus, upload.single('resume'), (req, res) => {
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

           // Remove the old resume file if it exists
        if (user.resumeDetails && user.resumeDetails.fileName) {
          const oldResumePath = path.join(user.resumeDetails.folderPath, user.resumeDetails.fileName);
          fs.unlink(oldResumePath, err => {
            if (err) {
              console.error('Error deleting old resume file:', err);
            }
          });
        }
  
    // Update the user's resumeDetails with the new file details
      user.resumeDetails = fileDetails;

        user.save()
          .then(updatedUser => {
            console.log("Updated user data:", updatedUser);
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
  
//-------------------added-----------------
//app.get('/logout', (req, res) => {
exports.UserLogout = (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy(err => {
      if (err) {
        console.error('Error while logging out:', err);
        res.status(500).send('An error occurred while logging out.');
      } else {
        // Redirect the user to the login page after logout
        res.redirect('/login.html');
      }
    });
  };

  //--------added---------------
  //app.get('/deactivate',checkAuthentication, (_req, res) => {
  exports.deactivate = (_req, res) => {
    res.sendFile('deactivate.html', { root: 'public' })
  };

//----------added-------------------
//app.post('/deactivate-account', (req, res) => {
exports.handleDeactivate = (req, res) => {
    const { email } = req.session; // Access the email from the session
  
    // Find the user by email in the database
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log("User not found for email:", email);
          return res.status(404).send("User not found.");
        }
  
        // Deactivate the account by updating the 'isActive' field to false
        user.isActive = false;
  
        // Create a new folder for deactivated resumes if it doesn't exist
        const deactivatedFolderPath = path.join(__dirname, 'deactivated_resumes');
        if (!fs.existsSync(deactivatedFolderPath)) {
          fs.mkdirSync(deactivatedFolderPath);
        }
  
        // Move the user's resume file to the new folder
        if (user.resumeDetails && user.resumeDetails.fileName) {
          const oldResumePath = path.join(user.resumeDetails.folderPath, user.resumeDetails.fileName);
          const newResumePath = path.join(deactivatedFolderPath, user.resumeDetails.fileName);
          fs.renameSync(oldResumePath, newResumePath);
          user.resumeDetails.folderPath = deactivatedFolderPath;
        }
  
        // Save the updated user document in the database
        user.save()
          .then(_updatedUser => {
            // Provide a link to reactivate the account
            const response = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
              <p>Your account has been deactivated. Click <a href="/reactivate-account">here</a> to reactivate your account.</p>
            </div>
          `;
            res.send(response);
          })
          .catch(err => {
            console.error("Error deactivating account:", err);
            res.status(500).send("An error occurred while deactivating the account.");
          });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };

  //-------------added----------
  //app.get('/reactivate-account', checkAuthentication, (req, res) => {
  exports.reactivate = (req, res) => {
    const { email } = req.query;
  
    // Render the reactivation form and pass the email as a variable
    res.render('reactivate-account', { email });
  };


  //-------------------added---------------
  //app.post('/reactivate-account', (req, res) => {
  exports.handleReactivate = (req, res) => {
    const { email } = req.body;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log("User not found for email:", email);
          return res.status(404).send("User not found.");
        }
  
        // Check if the account is already active
        if (user.isActive) {
          return res.send("Your account is already active.");
        }
  
        if (user.resumeDetails && user.resumeDetails.fileName) {
          // Get current path in deactivated_resumes folder
          const oldPath = path.join(__dirname, 'deactivated_resumes', user.resumeDetails.fileName);
  
          // Construct new path inside uploads folder
          const newPath = path.join(__dirname, 'uploads', user.resumeDetails.fileName);
  
          // Move file from deactivated_resumes to uploads folder
          try {
            fs.renameSync(oldPath, newPath);
            console.log('Resume moved to uploads folder:', newPath);
  
            // Update resumeDetails.folderPath to 'uploads'
            user.resumeDetails.folderPath = 'uploads';
  
            // Set user as active
            user.isActive = true;
  
            // Save user document
            user.save()
              .then(updatedUser => {
                console.log("User reactivated:", updatedUser);
                return res.redirect('/login.html'); // Redirect to login page after reactivation
              })
              .catch(err => {
                console.error('Error updating user document:', err);
                res.status(500).send('An error occurred while updating user document.');
              });
          } catch (err) {
            console.error('Error moving resume file:', err);
            res.status(500).send('An error occurred while moving resume file.');
          }
        } else {
          // If there's no resume file to move, just update user's isActive status
          user.isActive = true;
          user.save()
            .then(updatedUser => {
              console.log("User reactivated:", updatedUser);
              return res.redirect('/login.html'); // Redirect to login page after reactivation
            })
            .catch(err => {
              console.error('Error updating user document:', err);
              res.status(500).send('An error occurred while updating user document.');
            });
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  };


  //----------added---------------
  //app.get('/confirm-delete',checkAccountStatus,checkAuthentication, (_req, res) => {
  exports.confirmDelete = (_req, res) => {
    res.render('confirm-delete');
  };
  

  //--------------added--------------
  //app.post('/delete-account',checkAccountStatus, (req, res) => {
  exports.handleDelete = (req, res) => {
    const { email } = req.session; // Access the email from the session
  
    // Find the user by email in the database and delete the account
    User.findOneAndDelete({ email })
      .then(deletedUser => {
        if (!deletedUser) {
          console.log("User not found for email:", email);
          return res.status(404).send("User not found.");
        }
  
        // Check if the user has a resume file
        if (deletedUser.resumeDetails && deletedUser.resumeDetails.fileName) {
          // Construct the path to the resume file
          const resumeFilePath = path.join(deletedUser.resumeDetails.folderPath, deletedUser.resumeDetails.fileName);
  
          // Delete the file from the associated folder in the directory
          fs.unlink(resumeFilePath, (err) => {
            if (err) {
              console.error("Error deleting resume file:", err);
            } else {
              console.log("Resume file deleted:", resumeFilePath);
            }
          });
        }
  
        res.send("Your account and associated files have been deleted.");
      })
      .catch(err => {
        console.error("Error deleting user account:", err);
        res.status(500).send("An error occurred while deleting the account.");
      });
  };