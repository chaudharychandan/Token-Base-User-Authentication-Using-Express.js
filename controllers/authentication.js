const User = require('../models/user');

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(422).send({ error: 'You must provide email and password' });

  try {
    // See if a user exists with the given email address
    User.findOne({ email }, function(err, existingUser) {
      if(err) { return next(err); }

      // If a user with email does exist, return an error
      if(existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      // If a user with email does not exist, create and save the user record
      const user = new User({
        email, password
      });

      user.save(function(err) {
        if(err) { return next(err); }

        res.json({ success: true });
      });
    });
  } catch (err) {
    next(err);
  }

  // Respond to requesr indicating the user was created
};
