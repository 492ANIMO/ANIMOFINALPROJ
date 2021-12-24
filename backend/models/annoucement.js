const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  body: { type: String, trim: true, require: true},
  author: { type: String, require: true, trim: true}
},{
  timestamps: true,
  collection: 'annoucements'
});
module.exports = mongoose.model('Annoucement', schema);