const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  week_no:{
    type: String,
    required: true
  },
  referee_id: {
    type: Schema.Types.ObjectId,
    required: false
  },
  club1_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  club2_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  club1_goals:{
    type: String,
    required: false
  },
  club2_goals:{
    type: String,
    required: false
  }
});

const Match = mongoose.model('matches', MatchSchema);

module.exports = Match