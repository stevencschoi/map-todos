const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// GET route for reading data
router.get("/", function (req, res, next) {
  return res.sendFile(path.join(__dirname + "/templateLogReg/index.html"));
});

//POST route for updating data
router.post("/register", function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    const err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
  }

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.send(user);
      }
    });
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (
      error,
      user
    ) {
      if (error || !user) {
        const err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  } else {
    const err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.find({ username: username })
    .then(res => {
      bcrypt.compare(password, res[0].password).then(result => {
        if (result === true) {
          req.session.userId = res[0]._id;
          console.log("Login successful!");
          return res[0]._id;
        } else {
          console.log("Authentication failed");
          return "Authentication failed";
        }
      });
    })
    .catch(err => console.error(err));
});

// GET route after registering
router.get("/profile", function (req, res, next) {
  User.findById(req.session.userId).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        return res.send(
          "<h1>Name: </h1>" +
            user.username +
            "<h2>Mail: </h2>" +
            user.email +
            '<br><a type="button" href="/logout">Logout</a>'
        );
      }
    }
  });
});

// GET for logout logout
router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session = null;
    console.log("req.session null now", req.session);
    return "destroy";
    // req.session.destroy(function (err) {
    //   if (err) {
    //     return next(err);
    //   } else {
    //     return "destroy";
    //   }
    // });
  } else {
    console.log("no session");
  }
});

module.exports = router;
