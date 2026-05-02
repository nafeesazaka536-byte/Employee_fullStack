const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

// @desc    Get all payroll records
// @route   GET /api/payroll
// @access  Public
const getPayrolls = async (req, res, next) => {
  try {
    const payrolls = await Payroll.find({}).populate('employee', 'name department cnic');
    res.json(payrolls);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate payroll
// @route   POST /api/payroll
// @access  Public
const generatePayroll = async (req, res, next) => {
  try {
    const { employee, bonus, deduction, date } = req.body;

    const empRecord = await Employee.findById(employee);

    if (!empRecord) {
      res.status(404);
      throw new Error('Employee not found');
    }

    const netPay = empRecord.salary + Number(bonus || 0) - Number(deduction || 0);

    const payrollExists = await Payroll.findOne({ employee, date });

    if (payrollExists) {
      payrollExists.bonus = bonus;
      payrollExists.deduction = deduction;
      payrollExists.netPay = netPay;
      const updatedPayroll = await payrollExists.save();
      return res.json(updatedPayroll);
    }

    const payroll = await Payroll.create({
      employee,
      salary: empRecord.salary,
      bonus,
      deduction,
      netPay,
      date
    });

    if (payroll) {
      res.status(201).json(payroll);
    } else {
      res.status(400);
      throw new Error('Invalid payroll data');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayrolls,
  generatePayroll
};
