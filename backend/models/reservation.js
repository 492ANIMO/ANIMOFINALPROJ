const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Package = require('../models/package');

const schema = new Schema({
  resId: {type: String, default: '0000000000'},
  package: Package.schema,
  pet: {type: Schema.Types.ObjectId, ref: 'Pet'},
  date: {type: Date, required: true},
  time:{type: String, trim: true, required: true},
  status: {type: String, trim: true, default: 'รอยืนยัน', enum: ['pending', 'รอยืนยัน', 'ยืนยัน', 'ยกเลิก']},
  detail: {type: String, trim: true, default: '-'},
  doctor: {type: String, trim: true},
  owner: { type: Schema.Types.ObjectId, ref: 'Client' }
},{
  timestamps: true,
  collection: 'reservations'
});
module.exports = mongoose.model('Reservation', schema);