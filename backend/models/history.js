const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = require('../models/pet')
const Package = require('../models/package')
const Appointment = require('../models/appointment')

const schema = new Schema({
  pet: Pet.schema,
  package: Package.schema,
  appointment: Appointment.schema
  // appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' }
},{
  timestamps: true,
  collection: 'histories'
});
module.exports = mongoose.model('History', schema);