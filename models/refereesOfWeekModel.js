const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefereesOfWeekSchema = new Schema({
  week_no:{
    type: String,
    required: true
  },
  referee_ids: {
    type: Schema.Types.Array,
    required: true
  }
});

const RefereesOfWeek = mongoose.model('referees_of_weeks', RefereesOfWeekSchema);

module.exports = RefereesOfWeek