const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true, index: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum : ['client', 'staff', 'admin'], default: 'client' },

  profile: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },

  onModel: {
    type: String,
    required: true,
    enum: ['Staff', 'Client']
  }

},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'users'
});

userSchema.virtual('_client', {
  ref: 'Client',
  localField: '_id', //user._id
  foreignField: 'user', //
  justOne : true
});
userSchema.virtual('_staff', {
  ref: 'Staff',
  localField: '_id', //user._id
  foreignField: 'user', //
  justOne : true
});


const user = mongoose.model('User', userSchema);

module.exports = user; 