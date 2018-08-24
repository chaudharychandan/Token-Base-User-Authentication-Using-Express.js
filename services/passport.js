const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const config = require('../config');
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user id in payload exists in database
  User.findById(payload.sub, (err, user) => {
    // If it does, call done with that user
    // Otherwise, call done without a user object

    if (err) return done(err, false);

    return user ? done(null, user) : done(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);