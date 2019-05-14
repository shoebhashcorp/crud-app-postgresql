const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const commonValidations = require("../../validation/register");
// Load Input Validation
const isEmpty = require("../../validation/is-empty");

const validateLoginInput = require("../../validation/login");

// function validateregisterInput(data, otherValidations) {
//   let { errors } = otherValidations(data);
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

router.get("/:identifier", (req, res) => {
  User.query({
    select: ["id", "email"],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  })
    .fetch()
    .then(user => {
      res.json({ user });
    });
});

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

// router.post("/register", (req, res) => {
//   const { errors, isValid } = commonValidations(req.body);
//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   } else if (isValid) {
//     const { username, password, timezone, email } = req.body;
//     const password_digest = bcrypt.hashSync(password, 10);

//     User.forge(
//       {
//         username,
//         timezone,
//         email,
//         password_digest
//       },
//       {
//         hasTimestamps: true
//       }
//     )
//       .save()
//       .then(user => res.json({ success: true }))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ error: err });
//       });
//   } else {
//     res.status(400).json(errors);
//   }
// });

module.exports = router;
