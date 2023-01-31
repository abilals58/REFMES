const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreRatingSchema = new Schema({
  rating:{
    type: Schema.Types.Number,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  week_no:{
    type: String,
    required: true
  },
  referee_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

const PreRating = mongoose.model('pre_ratings', PreRatingSchema);

module.exports = PreRating