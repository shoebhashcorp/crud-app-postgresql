const express = require("express");
const router = express.Router();
const Address = require("../../models/post");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/user");
const validateProfileInput = require("../../validation/profile");
router.get(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Address.where({ userID: req.user.id })

      .fetchAll({ withRelated: ["user"] })
      .then(function(profile) {
        if (!profile) {
          return res.status(404).json("There is no profile for this user");
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const { firstName, lastName, email, phone, address } = req.body;
    const userID = req.user.id;
    Address.forge(
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        userID
      },
      {
        hasTimestamps: true
      }
    )
      .save()
      .then(profile => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

router.get("/user/:id", (req, res) => {
  Address.query({
    where: { userID: req.params.id }
  })
    .fetchAll({ withRelated: ["user"] })
    .then(add => {
      res.json({ add });
    });
});

module.exports = router;
