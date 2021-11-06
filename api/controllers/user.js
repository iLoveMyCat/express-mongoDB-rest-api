const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length > 0) {
      return res.status(409).json({
        message: "Mail exists",
      });
    } else {
      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
          if (err) {
            return res.status(500).json({ error: err });
          }
          const user = new User({
            email: req.body.email,
            password: hashedPassword,
          });
          user
            .save()
            .then((user) => {
              const response = {
                _id: user.id,
                name: user.email,
                Request: {
                  type: "GET",
                  URL: `http://${process.env.HOST}:${process.env.PORT}/users/${user._id}`,
                },
              };
              res.status(200).json(response);
            })
            .catch((err) => {
              res.status(501).json({
                message: err._message || err.code || err.message || err,
              });
            });
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  res.status(200).json({ message: "controller to create" });
};

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({ message: "controller to create" });
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ message: "controller to create" });
};

exports.updateUser = (req, res, next) => {
  res.status(200).json({ message: "controller to create" });
};

exports.deleteUser = (req, res, next) => {
  res.status(200).json({ message: "controller to create" });
};
