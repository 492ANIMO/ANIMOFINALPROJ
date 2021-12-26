const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user'); // import User models

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  contact: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: {
    province: { type: String },
    district: { type: String },
    subdistrict: { type: String },
    postalCode: { type: String },
    detail: { type: String, trim: true }
  },
  role: { type: String, default: 'staff' },
  avatar: { type: String },

  // foreign key
  _user: { type: Schema.Types.ObjectId, ref: 'User' }

},{
  timestamps: true,
  collection: 'staffs'
});


module.exports = mongoose.model('Staff', schema);