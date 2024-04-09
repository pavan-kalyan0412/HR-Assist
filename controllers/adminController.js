const admin = require('../models/admin.js')
const User = require('../models/User')


  exports.isAuthenticated = (req, res, next) => {
    // Check if user is logged in by checking the session
    if (req.session && req.session.admin) {
      // User is authenticated, proceed to the next middleware
      next();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/admin');
    }
  }
  
  // Route to serve the admin login page
//   app.get('/admin', (_req, res) => {
    exports.admin = (_req, res) => {
    res.sendFile('admin-reg.html', { root: 'public' })
  }
  
  
  //app.post('/admin-reg', async (req, res) => {
  exports.adminReg = async(req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if provided credentials match the default admin account
      if (email === 'admin@example.com' && password === 'adminPassword') {
          // Set admin session
        req.session.admin = true;
      console.log("New admin account created successfully");
      res.status(200).redirect('/admin-dashboard');
      } else{
        res.status(404).send("this is invalid user or password")
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  // app.get('/admin-dashboard', isAuthenticated, (req, res) => {
  exports.adminDashboard = (req, res) => {
    // Fetch all users from the RegisterSchema and sort them by email in ascending order
    User.find({}).sort({ email: 1 })
      .then(users => {
        // Render the admin dashboard view with the sorted user data
        res.render('admin-dashboard', { users });
      })
      .catch(err => {
        console.error("Error fetching and sorting user data:", err);
        res.status(500).send("An error occurred while fetching and sorting user data.");
      });
  }
  