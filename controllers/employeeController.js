const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Public
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      res.json(employee);
    } else {
      res.status(404);
      throw new Error('Employee not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create an employee
// @route   POST /api/employees
// @access  Public
const createEmployee = async (req, res, next) => {
  try {
    const { name, cnic, email, phone, department, jobTitle, salary, status } = req.body;

    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      res.status(400);
      throw new Error('Employee already exists');
    }

    const employee = await Employee.create({
      name,
      cnic,
      email,
      phone,
      department,
      jobTitle,
      salary,
      status
    });

    if (employee) {
      res.status(201).json(employee);
    } else {
      res.status(400);
      throw new Error('Invalid employee data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Public
const updateEmployee = async (req, res, next) => {
  try {
    const { name, cnic, email, phone, department, jobTitle, salary, status } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (employee) {
      employee.name = name || employee.name;
      employee.cnic = cnic || employee.cnic;
      employee.email = email || employee.email;
      employee.phone = phone || employee.phone;
      employee.department = department || employee.department;
      employee.jobTitle = jobTitle || employee.jobTitle;
      employee.salary = salary || employee.salary;
      employee.status = status || employee.status;

      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404);
      throw new Error('Employee not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      await employee.deleteOne();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404);
      throw new Error('Employee not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
