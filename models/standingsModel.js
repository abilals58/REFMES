const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Standings = new Schema({
  allData: {
    type: Object,
    required: true,
  }
});

const StandingsData = mongoose.model('standings', Standings);

module.exports = StandingsData