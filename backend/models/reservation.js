const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  package: [{ type: Schema.Types.ObjectId, ref: 'Package' }],
  pet: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  date: {type: Date, required: true},
  time:{type: String, trim: true, required: true},
  status: {type: String, trim: true, default: 'pending'},
  doctor: [{type: Schema.Types.ObjectId, ref: 'Staff'}],
  appointment: [{type: Schema.Types.ObjectId, ref: 'Appointment'}],
},{
  timestamps: true,
  collection: 'reservations'
});
module.exports = mongoose.model('Reservation', schema);