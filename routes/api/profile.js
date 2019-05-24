const express = require("express");
const router = express.Router();
const Address = require("../../models/post");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/user");

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
    const { firstName, lastName, phone, address } = req.body;
    const userID = req.user.id;
    Address.forge(
      {
        firstName,
        lastName,
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
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

module.exports = router;
