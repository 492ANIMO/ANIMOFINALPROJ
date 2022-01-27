const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  detail: { type: String, trim: true},
  type: { type: String, trim: true, enum: ['การรักษา', 'การตรวจสุขภาพ'], default: 'การรักษา'}
},{
  collection: 'treatments'
});
module.exports = mongoose.model('Treatment', schema);