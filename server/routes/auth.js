const express = require('express');
const { signUp, signIn, findUserByUserName, resetPassword, verifyOTP } = require('../controller/auth');

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/usrbyname', findUserByUserName);
router.put('/resetpassword', resetPassword);
router.post('/verifyotp', verifyOTP);

module.exports = router;