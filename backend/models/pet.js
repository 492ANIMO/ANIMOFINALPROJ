const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = require('../models/client.js');

const schema = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  type: { type: String, required: true, trim: true },
  breed: { type: String, trim: true },
  gender: { type: String, trim: true },
  bloodType: { type: String, trim: true },
  weight: { type: String, trim: true },
  dob: { type: String, trim: true },
  sterilization: { type: Boolean },
  avatar: { type: String },

  // foreign key
  _owner: { type: Schema.Types.ObjectId, ref: 'Client' }

},{
  collection: 'pets'
});



module.exports = mongoose.model('Pet', schema);