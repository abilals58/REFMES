const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({

    user_id: {
        type: String,
        required: true,
    },
    user_email:{
        type: String,
        required: true,
  },
  user_message:{
    type: String,
    required: true,
 }

});
const Report = mongoose.model('reports', ReportSchema);

module.exports = Report;
