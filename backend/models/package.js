const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import models
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  vaccines: [{ type: Schema.Types.ObjectId, ref: 'Vaccine' }],
  treatments: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }],
  healthChecks: [{ type: Schema.Types.ObjectId, ref: 'HealthCheck' }],
  detail: { type: String, trim: true},
  price: { type: Number },
  type: { type: String, trim: true}

},{
  timestamps: true, 
  collection: 'packages'
});

module.exports = mongoose.model('Package', schema);