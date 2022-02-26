const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true, index: true },
  password: { type: String, trim: true },
  role: { type: String, enum : ['client', 'staff', 'admin', 'vet'], default: 'client' },

  profile: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },

  googleId: { type: String },

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

const user = mongoose.model('User', userSchema);

module.exports = user; 