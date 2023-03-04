const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioFileSchema = new Schema({
  title: { type: String, required: false },
  artist: { type: String, required: false },
  url: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const AudioFile = mongoose.model('AudioFile', audioFileSchema);

module.exports = AudioFile;
