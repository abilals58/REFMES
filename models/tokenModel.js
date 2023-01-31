const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  token:{
    type: String,
    required: true
  }
 
});

const Token = mongoose.model('tokens', TokenSchema);

module.exports = Token