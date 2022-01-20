const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
  
  title: { type: String, required: true, trim: true, minlength: 3 },
  body: { type: String, trim: true, require: true},
  author: { type: String, require: true, trim: true},
  img: { type: String, require: false, trim: true},
  type: { type: String, require: false, trim: true, default: 'ข่าวสาร'},
  anncoumentId: { type: Number },

},{
  timestamps: true,
  collection: 'annoucements'
});

schema.plugin(AutoIncrement, {id:'anncoumentId_seq',inc_field: 'anncoumentId'});

module.exports = mongoose.model('Annoucement', schema);