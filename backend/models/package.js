const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  vaccine: [{ type: String, trim: true }],
  treatment: [{ type: String, trim: true }],
  healthCheck: [{ type: String, trim: true }],
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