const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
const { Strategy: GithubStrategy } = require("passport-github");
const { GOOGLE_CONFIG, GITHUB_CONFIG } = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const securityConfig = require("../config");
const User = require("../models/user");
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.forge({ id: id })
//     .fetch()
//     .asCallback(function(err, user) {
//       done(err, user);
//     });
// });

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.forge({ id: jwt_payload.id })
        .fetch()
        .then(user => {
          if (user) {
            console.log("user", user);
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  const callback = (accessToken, refreshToken, profile, cb) => {
    cb(null, profile);
  };

  // Adding each OAuth provider's strategy to passport

  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
};
