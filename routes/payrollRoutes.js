const express = require('express');
const router = express.Router();
const {
  getPayrolls,
  generatePayroll
} = require('../controllers/payrollController');

router.route('/').get(getPayrolls).post(generatePayroll);

module.exports = router;
