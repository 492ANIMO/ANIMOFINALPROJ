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
  time: {
    begin: { 
      hours: { type: Number, min: 0, max: 23 },
      minutes: { type: Number, min: 0, max: 59 }
     },
    end: {  
      hours: { type: Number, min: 0, max: 23 },
      minutes: { type: Number, min: 0, max: 59 }
     }
  },
  price: { type: Number }

},{
  timestamps: true, 
  collection: 'packages'
});

module.exports = mongoose.model('Package', schema);