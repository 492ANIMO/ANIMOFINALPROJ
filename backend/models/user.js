const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = require('../models/client');

const userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true, index: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum : ['client', 'staff', 'admin'], default: 'client' }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'users'
});

userSchema.virtual('_client', {
  ref: 'Client',
  localField: '_id', //user._id
  foreignField: '_user' //
});
userSchema.virtual('_staff', {
  ref: 'Staff',
  localField: '_id', //user._id
  foreignField: '_user' //
});


const user = mongoose.model('User', userSchema);

module.exports = user; 