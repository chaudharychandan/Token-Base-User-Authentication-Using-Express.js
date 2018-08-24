const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const config = require('../config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify this username and password
  User.findOne({ email }, (err, user) => {
    if (err) return done(err, false);
    if(!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if(err) return done(err);

      if(!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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
passport.use(localLogin);
