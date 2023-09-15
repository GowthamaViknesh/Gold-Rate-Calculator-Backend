const express = require('express');
const router = express.Router();
const {
  getContact,
  test,
  registerUser,
  loginUser,
  forgotPassword,
  getProfile,
  resetPassword,
  saveCalc,
  getData,
  deleteRecord,
  verifyOTP,
} = require('../controllers/controller');

//Creating the routes to access the api end point
router.route('/').get(test);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/forgot').post(forgotPassword);
router.route('/profile').post(getProfile);
router.route('/contact').post(getContact);
router.route('/verify').post(verifyOTP);
router.route('/reset').post(resetPassword);
router.route('/calcSave').post(saveCalc);
router.route('/getData').post(getData);
router.route('/delete').post(deleteRecord);

module.exports = router;
