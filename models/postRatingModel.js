const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostRatingSchema = new Schema({
  rating:{
    type: Schema.Types.Number,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  match_id:{
    type: Schema.Types.ObjectId,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

const PostRating = mongoose.model('post_ratings', PostRatingSchema);

module.exports = PostRating