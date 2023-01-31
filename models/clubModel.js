const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  short_name:{
    type: String,
    required: true
  },
  asci_name:{
    type: String,
    required: true
  },
  founded:{
    type: String,
    required: true
  },
  website:{
    type: String,
    required: true
  },
  players:{
    type: Schema.Types.Array,
    required: true

  }

});

const Club = mongoose.model('clubs', ClubSchema);

module.exports = Club