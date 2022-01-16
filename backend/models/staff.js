const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user'); // import User models

const schema = new Schema({
  firstName: { type: String, required: true, trim: true},
  lastName: { type: String, required: true, trim: true},
  contact: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: {
    province: { type: String },
    district: { type: String },
    subdistrict: { type: String },
    postalCode: { type: String },
    detail: { type: String, trim: true }
  },
  position: { type: String, default: 'staff', enum: ['vet', 'staff'] },
  avatar: { type: String },

  // foreign key
  user: { type: Schema.Types.ObjectId, ref: 'User' }

},{
  timestamps: true,
  collection: 'staffs'
});


module.exports = mongoose.model('Staff', schema);