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

router.put(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Address.where({ id: req.params.id })
      .fetch()
      .then(add => {
        add
          .save({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
          })

          .then(saved => {
            res.json({ saved });
          });
      });
  }
);

router.delete(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Address.where({ id: req.params.id })
      .destroy()
      .then(destroyed => {
        res.json({ destroyed });
      });
  }
);

router.get(
  "/contact/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Address.query({
      where: { id: req.params.id }
    })
      .fetchAll({ withRelated: ["user"] })
      .then(add => {
        if (!add) {
          errors.noadd = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(add);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }
);

module.exports = router;
