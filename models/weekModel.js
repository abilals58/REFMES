const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
  type:{
    type: Schema.Types.String,
    required: true
  },
  week_no: {
    type: Schema.Types.Number,
    required: true
  }
});

const Week = mongoose.model('weeks', WeekSchema);

module.exports = Week