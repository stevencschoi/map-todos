const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Todo = require("../models/todo");

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
        return res.send(user._id);
      }
    });
  } else {
    const err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
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

// GET route to show todos
router.get("/todos", (req, res) => {
  const user_id = req.query.user_id;
  Todo.find({ user_id: user_id })
    .then(todos => {
      console.log("todos:", todos);
      res.json(todos);
    })
    .catch(error => console.error(error));
});

// POST request to add todo
router.post("/todos", (req, res, next) => {
  const todoData = { user_id: req.body.user_id, text: req.body.text };
  Todo.create(todoData, function (error, todo) {
    if (error) {
      return next(error);
    }
    res.json(todo);
  });
});

// PUT request to edit todo
router.put("/todos/edit", (req, res, next) => {
  const todoData = { _id: req.body.todoId, text: req.body.todoText };
  Todo.updateOne(
    { _id: todoData._id },
    { $set: { text: todoData.text } },
    function (error, todo) {
      if (error) {
        return next(error);
      }
      res.json(todo);
    }
  );
});

// PUT request to update todo
router.put("/todos/update", (req, res, next) => {
  const todoData = { _id: req.body.todoId, isComplete: !req.body.isComplete };
  Todo.updateOne(
    { _id: todoData._id },
    { $set: { isComplete: todoData.isComplete } },
    function (error, todo) {
      if (error) {
        return next(error);
      }
      res.json(todo);
    }
  );
});

// DELETE request to delete todo
router.delete("/todos/delete", (req, res) => {
  const { user_id, todoId } = req.query;
  const data = { user_id: req.query.user_id, todoId: req.query.todoId };
  // console.log(todoId)
  // Todo.deleteOne({ "user_id": user_id }, { "_id": todoId })
  Todo.findOneAndDelete({ _id: todoId }, function (error, todo) {
    if (error) {
      return next(error);
    }
    res.json(todo);
  });
  console.log("deleted");
});

module.exports = router;

//authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }
