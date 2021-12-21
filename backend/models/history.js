const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
  package: { type: Schema.Types.ObjectId, ref: 'Package' },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' }
},{
  timestamps: true,
  collection: 'histories'
});
module.exports = mongoose.model('History', schema);