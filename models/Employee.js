const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  cnic: {
    type: String,
    required: [true, 'Please add a CNIC'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  department: {
    type: String,
    required: [true, 'Please add a department']
  },
  jobTitle: {
    type: String,
    required: [true, 'Please add a job title']
  },
  salary: {
    type: Number,
    required: [true, 'Please add a salary']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
