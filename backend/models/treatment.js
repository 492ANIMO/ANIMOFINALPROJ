const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  detail: { type: String, trim: true}
},{
  collection: 'treatments'
});
module.exports = mongoose.model('Treatment', schema);