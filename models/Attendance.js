const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave', 'Half-Day'],
    required: [true, 'Please specify attendance status']
  }
}, {
  timestamps: true
});

// Ensure one attendance record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
