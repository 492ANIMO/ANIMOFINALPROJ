const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  petType: { type: String, required: true, trim: true },
},{
  collection: 'petTypes',
  timestamps: true.valueOf,
});


module.exports = mongoose.model('PetType', schema);