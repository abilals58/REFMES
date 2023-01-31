const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObserverRatingSchema = new Schema({
  rating:{
    type: Schema.Types.Number,
    required: true
  },
  observer_id: {
    type: Schema.Types.Number,
    required: true
  },
  match_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  ref_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  week_no:{
    type: Schema.Types.Number,
    required: true
  }
});


const ObserverRating = mongoose.model('observer_ratings', ObserverRatingSchema);

module.exports = ObserverRating