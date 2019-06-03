const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../../controllers/authController");

// Setting up the passport middleware for each of the OAuth providers
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});
const githubAuth = passport.authenticate("github");

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client

router.get("/google", addSocketIdtoSession, googleAuth);
router.get("/github", addSocketIdtoSession, githubAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get("/google/callback", googleAuth, authController.google);
router.get("/github/callback", githubAuth, authController.github);

module.exports = router;
