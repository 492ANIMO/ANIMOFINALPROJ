const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  type: { type: String,  trim: true},
  manufacturer: { type: String, trim: true},
  lot_number: { type: String, trim: true},
  detail: { type: String, trim: true}
},{
  collection: 'vaccines'
});
module.exports = mongoose.model('Vaccine', schema);