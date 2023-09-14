const express = require('express');
const router = express.Router();
const {
  getContact,
  logoutUser,
  test,
  registerUser,
  loginUser,
  forgotPassword,
  getProfile,
  isloggedIn,
  resetPassword,
  saveCalc,
  getData,
  deleteRecord,
} = require('../controllers/controller');

//Creating the routes to access the api end point
router.route('/').get(test);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/forgot').post(forgotPassword);
router.route('/profile').get(getProfile);
router.route('/logout').get(logoutUser);
router.route('/contact').post(getContact);
router.route('/isloggedIn').get(isloggedIn);
router.route('/reset').post(resetPassword);
router.route('/calcSave').post(saveCalc);
router.route('/getData').get(getData);
router.route('/delete').delete(deleteRecord);

module.exports = router;
