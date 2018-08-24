const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Your email cannot be blank.'],
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  const { password } =  this;

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash our password using the salt
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) return next(err);

      // overrite plain text password with encrypted password
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
}

// Create the model class
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;