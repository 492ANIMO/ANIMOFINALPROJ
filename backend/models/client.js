const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import models
const User = require('./user'); 
const Pet = require('./pet');

const schema = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  contact: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: {
    province: { type: String },
    district: { type: String },
    subdistrict: { type: String },
    postalCode: { type: String },
    detail: { type: String, trim: true }
  },
  role: { type: String, default: 'client' },
  avatar: { type: String },

  // foreign key
  _user: { type: Schema.Types.ObjectId, ref: 'User' }

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