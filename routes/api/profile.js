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
    Address.forge({ userID: req.user.id })
      .fetch({ withRelated: ["user"] })
      .then(function(collection) {
        console.log("user", collection);
        res.json({ error: false, data: collection.toJSON() });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
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
