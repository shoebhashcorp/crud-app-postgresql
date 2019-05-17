const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// Load Input Validation
const commonValidations = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const authenticate = require("../../middlewares/authenticate");
const isEmpty = require("../../validation/is-empty");
const config = require("../../config");
knex = require("../../knexfile");
function validateRegisterInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  })
    .fetch()
    .then(user => {
      if (user) {
        if (user.get("username") === data.username) {
          errors.username = "There is user with such username.";
        }

        if (user.get("email") === data.email) {
          errors.email = "Email is already exists";
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
}

// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.query({
//       select: ["email"],
//       where: { email: req.params.email }
//       // orWhere: { id: req.params.identifier }
//     })
//       .fetch()
//       .then(user => {
//         res.json({ user });
//       });
//   }
// );

router.post("/register", (req, res) => {
  validateRegisterInput(req.body, commonValidations).then(
    ({ errors, isValid }) => {
      if (isValid) {
        const { username, password, timezone, email } = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        User.forge(
          {
            username,
            timezone,
            email,
            password_digest
          },
          {
            hasTimestamps: true
          }
        )
          .save()
          .then(user => res.json({ success: true }))
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      } else {
        res.status(400).json(errors);
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  })
    .fetch()
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.get("password_digest"))) {
          const token = jwt.sign(
            {
              id: user.get("id"),
              username: user.get("username"),
              email: user.get("email")
            },
            config.jwtSecret
          );

          res.json({ token: "bearer " + token });
        } else {
          res.status(401).json({ errors: { form: "Invalid Credentials." } });
        }
      } else {
        console.log(res);
        res.status(401).json({ errors: { form: "Invalid Credentials." } });
      }
    });
});

router.get(
  "/currents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

router.post("/current", authenticate, (req, res) => {
  res.status(201).json({ user: req.currentUser });
});

module.exports = router;
