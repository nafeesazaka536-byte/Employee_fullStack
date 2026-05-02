const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  salary: {
    type: Number,
    required: true
  },
  bonus: {
    type: Number,
    default: 0
  },
  deduction: {
    type: Number,
    default: 0
  },
  netPay: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payroll', payrollSchema);
