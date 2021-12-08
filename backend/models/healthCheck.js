const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, trim: true},
  detail: { type: String, trim: true}
},{
  collection: 'healthChecks'
});
module.exports = mongoose.model('HealthCheck', schema);