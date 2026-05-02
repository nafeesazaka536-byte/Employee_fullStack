const Attendance = require('../models/Attendance');

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Public
const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({}).populate('employee', 'name department');
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Public
const markAttendance = async (req, res, next) => {
  try {
    const { employee, date, status } = req.body;

    const recordExists = await Attendance.findOne({ employee, date });

    if (recordExists) {
      // Update existing record for that day
      recordExists.status = status;
      const updatedRecord = await recordExists.save();
      return res.json(updatedRecord);
    }

    const attendance = await Attendance.create({
      employee,
      date,
      status
    });

    if (attendance) {
      res.status(201).json(attendance);
    } else {
      res.status(400);
      throw new Error('Invalid attendance data');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAttendance,
  markAttendance
};
