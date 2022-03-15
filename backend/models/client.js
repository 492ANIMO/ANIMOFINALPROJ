const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

// import models
const User = require('./user'); 
const Pet = require('./pet');

const schema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  contact: { type: String, trim: true },
  email: { type: String, trim: true },
  address: {
    province: { type: String, trim: true },
    district: { type: String, trim: true },
    subdistrict: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    detail: { type: String, trim: true }
  },
  role: { type: String, default: 'client' }, //x
  avatar: { type: String, default: 'https://storage.googleapis.com/animo492/nopic.jpeg' },
  uid: { type: String, default: '0000000000' },

  // foreign key
  user: { type: Schema.Types.ObjectId, ref: 'User' } //x

},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'clients'
});

schema.virtual('pet', {
  ref: 'Pet',
  localField: '_id', 
  foreignField: 'owner' 
});

module.exports = mongoose.model('Client', schema);