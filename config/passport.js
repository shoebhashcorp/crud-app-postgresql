const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const securityConfig = require("../config");
const User = require("../models/user").User;

// module.exports = function() {
//   const opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = securityConfig.jwtSecret;
//   passport.use(
//     new JwtStrategy(opts, function(jwt_payload, done) {
//       User.findByPk(jwt_payload.id)
//         .then(user => (user ? done(null, user) : done(null, false)))
//         .catch(err => done(err, false));
//     })
//   );
// };

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: "nodeauthsecret"
  };
  passport.use(
    "jwt",
    new JwtStrategy(opts, function(jwt_payload, done) {
      console.log("payload received", jwt_payload);
      User.fetch(jwt_payload.id)
        .then(user => {
          return done(null, user);
        })
        .catch(error => {
          return done(error, false);
        });
    })
  );
};
