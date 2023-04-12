const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {type: String},
  description: {type: String},
  city: {type: String},
  province: {type: String},
  pay: {type: Number},
  contactEmail: {type: String},
  contactNumber: {type: Number},
  photo: {type: String},
  user_id: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
},{
  timestamps: true
});




module.exports = mongoose.model('Job', jobSchema);