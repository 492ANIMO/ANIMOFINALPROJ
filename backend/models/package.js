const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import models
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  vaccineObj: [{ type: Schema.Types.ObjectId, ref: 'Vaccine' }],
  treatmentObj: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }],
  healthCheckObj: [{ type: Schema.Types.ObjectId, ref: 'HealthCheck' }],
  detail: { type: String, trim: true},
  price: { type: Number }

},{
  timestamps: true, 
  collection: 'packages'
});

module.exports = mongoose.model('Package', schema);