const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import models
const Vaccine = require('../models/vaccine');
const Treatment = require('../models/treatment');
const HealthCheck = require('../models/healthCheck');

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  // vaccines: [{ type: Schema.Types.ObjectId, ref: 'Vaccine' }],
  vaccines: [{
    name: { type: String, required: true, trim: true},
    type: { type: String, required: true, trim: true},
    manufacturer: { type: String, trim: true},
    lot_number: { type: String, trim: true},
    detail: { type: String, trim: true}
  }],
  treatments: [{ 
    name: { type: String, required: true, trim: true},
    detail: { type: String, trim: true} }],
  healthChecks: [{ 
    name: { type: String, required: true, trim: true},
    detail: { type: String, trim: true} }],
    
  detail: { type: String, trim: true},
  price: { type: Number },
  type: { type: String, trim: true}

},{
  timestamps: true, 
  collection: 'packages'
});

module.exports = mongoose.model('Package', schema);