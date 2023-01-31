const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefmesRatingSchema = new Schema({
  wFan:{
    type: Schema.Types.String,
    required: true
  },
  wObserver: {
    type: Schema.Types.String,
    required: true
  },
  wExperience:{
    type: Schema.Types.String,
    required: true
  },
  wConstant:{
    type: Schema.Types.String,
    required: true
  }
});

const RefmesRating = mongoose.model('refmes_rating_weights', RefmesRatingSchema);

module.exports = RefmesRating