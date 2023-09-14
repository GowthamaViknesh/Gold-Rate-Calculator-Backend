const express = require('express');
const router = express.Router();
const cors = require('cors');
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

//middleware
router.use(
  cors({
    credentials: true,
    origin: 'https://6502b49110f85c2b90f6686e--superlative-pithivier-4b4a80.netlify.app/',
  })
);

//Creating the routes to access the api end point
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.get('/profile', getProfile);
router.get('/logout', logoutUser);
router.post('/contact', getContact);
router.get('/isloggedIn', isloggedIn);
router.post('/reset', resetPassword);
router.post('/calcSave', saveCalc);
router.get('/getData', getData);
router.delete('/delete', deleteRecord);

module.exports = router;
