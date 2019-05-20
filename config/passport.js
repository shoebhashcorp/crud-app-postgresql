const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const securityConfig = require("../config");
const User = require("../models/user");
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = securityConfig.jwtSecret;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.forge({ id: id })
    .fetch()
    .asCallback(function(err, user) {
      done(err, user);
    });
});

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
};
