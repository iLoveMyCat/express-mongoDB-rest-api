const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

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
  User.find({ email: req.body.email }).then((user) => {
    if (user.length === 0) {
      return res.status(401).json({
        message: "Authorization failed!",
      });
    } else {
      bcrypt.genSalt(13, (err, salt) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
          if (err) {
            return res.status(500).json({ error: err });
          }
          if (bcrypt.compare(req.body.password, hashedPassword)) {
            const token = jsonwebtoken.sign(
              { id: user._id, email: user.email },
              process.env.JWT_SECRET
            );
            const response = {
              _id: user.id,
              name: user.email,
              token: token,
              Request: {
                type: "GET",
                URL: `http://${process.env.HOST}:${process.env.PORT}/users/${user._id}`,
              },
            };
            return res.status(200).json(response);
          } else {
            return res.status(401).json({
              message: "Authorization failed!",
            });
          }
        });
      });
    }
  });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("_id email")
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((user) => {
          return {
            _id: user.id,
            email: user.email,
            Request: {
              type: "GET",
              URL: `http://${process.env.HOST}:${process.env.PORT}/users/${user._id}`,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .select("_id email createdAt updatedAt")
    .then((user) => {
      const response = {
        user: {
          _id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
      res.status(200).json({
        message: `succesfully served '${user.email}', id: ${user._id}`,
        user: user,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
    .select("_id email")
    .then((updatedUser) => {
      const response = {
        message: `${updatedUser.email} updated successfully`,
        user: {
          _id: updatedUser._id,
          name: updatedUser.email,
          Request: {
            type: "GET",
            URL: `http://${process.env.HOST}:${process.env.PORT}/users/${updatedUser._id}`,
          },
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message:
          result.deletedCount > 0
            ? `succesfully deleted user with an id of: ${id}`
            : `Succefully recieved DELETE request, but, ${id} is not found.`,
        deletedCount: result.deletedCount,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};
