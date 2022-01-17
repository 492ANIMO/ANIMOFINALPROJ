const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = require('../models/client');

const schema = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  type: { type: String, trim: true },
  breed: { type: String, trim: true },
  gender: { type: String, trim: true },
  bloodType: { type: String, trim: true },
  weight: { type: Number, trim: true },
  dob: { type: String, trim: true },
  sterilization: { type: Boolean,  trim: true },
  avatar: { type: String,  trim: true },
  detail: { type: String,  trim: true },
  // foreign key
  owner: { type: Schema.Types.ObjectId, ref: 'Client' },

},{
  collection: 'pets'
});



module.exports = mongoose.model('Pet', schema);