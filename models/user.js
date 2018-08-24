const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

// Create the model class
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;