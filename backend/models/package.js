const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    
  detail: { type: String, trim: true, default: '-'},
  price: { type: Number },
  type: { type: String, trim: true},
  
  pid: {  type: Number }

},{
  timestamps: true, 
  collection: 'packages'
});

schema.plugin(AutoIncrement, {id:'pid_req',inc_field: 'pid'});

module.exports = mongoose.model('Package', schema);