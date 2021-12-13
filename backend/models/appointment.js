const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import models
const Pet = require('../models/pet');

const schema = new Schema({
  petObj: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  date: {type: Date, required: true},
  time:{type: String, trim: true, required: true},
  type:{type: String, trim: true},
  detail: { type: String},
  package: [{ type: Schema.Types.ObjectId, ref: 'Package' }],
},{
  timestamps: true, 
  collection: 'appointments'
});

module.exports = mongoose.model('Appointment', schema);