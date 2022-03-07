const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import models
const Pet = require('../models/pet');
const Package = require('../models/package');
const Reservation = require('../models/reservation');

const schema = new Schema({
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
  date: {type: Date, required: true},
  time:{type: String, trim: true, required: true},
  type:{type: String, trim: true, enum: ['ทั่วไป', 'วัคซีน', 'การรักษา', 'ตรวจสุขภาพ', 'แพ็คเกจ'], default: 'ทั่วไป'},
  detail: { type: String}, //
  status: { type: String, trim: true, required: true, default:'ไปตามเวลานัด'},
  by: {type: String, trim: true, enum: ['นัดโดยสัตวแพทย์', 'การจอง'], default: 'นัดโดยสัตวแพทย์'},
  doctor: { type: String, trim: true, required: false},
  reservation: Reservation.schema,
  appId:{ type: String },
  
},{
  strict: false,
  timestamps: true, 
  collection: 'appointments'
});

module.exports = mongoose.model('Appointment', schema);