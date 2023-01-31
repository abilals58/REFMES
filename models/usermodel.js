const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  full_name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fan_of:{
    type: String,
    required: true
  },
  social_media:{
    type: Schema.Types.Array
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User