// Requiring path to so we can use relative routes to our HTML files


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("/members");
    }
    res.render("login-signup")
    // res.sendFile(path.join(__dirname, "../public/login-signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login-signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("members");
  });

  app.get("/contactUs", function(req, res) {

    res.render("contactUs");
  });

  app.get("/restaurantReview", function(req, res) {

    res.render("restaurantReview");
  });

  app.get("/tipcalculator", function(req, res) {
    
    res.render("tipcalculator");
  });

  app.get("/login-signup", function(req, res) {

    res.render("login-signup");
  });
};
