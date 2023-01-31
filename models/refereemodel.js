const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefereeSchema = new Schema({
  r_username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  biography:{
    type:String,
    required:true
  },
  birth_date: {
    type: String,
    required: true,
  },
  birth_place: {
    type: String,
    required: true
  },
  fifa_date: {
    type: String,
    required: true
  },
  first_super_date: {
    type: String,
    required: true
  },
  total_rating: {
    type: Schema.Types.Number,
    required: true
  },
  rating_count: {
    type: Schema.Types.Number,
    required: true
  },
  totalMatch:{
    type:Schema.Types.Number,
  },
   yellowCard:{
    type:Schema.Types.Number,
   },
   avgYellowCard:{
    type:Schema.Types.Number,
   },
   yellowToRed:{
    type:Schema.Types.Number,
   },
   redCard:{
    type:Schema.Types.Number,
   },
   avgRedCard:{
    type:Schema.Types.Number,
   },
   penalty:{
    type:Schema.Types.Number,
   },
   avgPenalty:{
    type:Schema.Types.Number,
   },
   t_name: {
    type: String,
    required: true
  },
  preRating: {
    type: Schema.Types.Array,
  },
  postRating: {
    type:Schema.Types.Array,
  },
  observerRating: {
    type:Schema.Types.Array,
  }
});

const Referee = mongoose.model('referees', RefereeSchema);

module.exports = Referee