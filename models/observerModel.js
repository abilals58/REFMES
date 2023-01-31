const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObserverSchema = new Schema({

    observer_id: {
        type: Schema.Types.Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
  }

});
const Observer = mongoose.model('observers', ObserverSchema);

module.exports = Observer;
