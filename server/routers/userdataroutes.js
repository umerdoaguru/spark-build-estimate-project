const express = require("express");
const multer = require("multer");
const router = express.Router();

// const {Register,Allregister, Login,} = require('../controllers/UserController');


const {
  register,
  login,

  sendOtpEmployee,
  verifyOtpEmployee,
  resetPasswordEmployee,
  sendOtpAdmin,
  verifyOtpAdmin,
  resetPasswordAdmin,
  sendOtpSuperAdmin,
  verifyOtpSuperAdmin,
  resetPasswordSuperAdmin,
  user_register,
  userlogin,sendOtpUser ,verifyOtpUser,resetPasswordUser
} = require("../controllers/UserRegitrationlLogin");


router.post("/register", register);
router.post("/login", login);

router.post("/sendOtp-employee", sendOtpEmployee);
router.post("/verifyOtp-employee", verifyOtpEmployee);
router.put("/resetPassword-employee",resetPasswordEmployee);

router.post("/sendOtp-admin", sendOtpAdmin);
router.post("/verifyOtp-admin", verifyOtpAdmin);
router.put("/resetPassword-admin",resetPasswordAdmin);

router.post("/sendOtp-superadmin", sendOtpSuperAdmin);
router.post("/verifyOtp-superadmin", verifyOtpSuperAdmin);
router.put("/resetPassword-superadmin",resetPasswordSuperAdmin);


router.post("/user-login", userlogin);
router.post("/user-register", user_register);
router.post("/sendOtp-user", sendOtpUser);
router.post("/verifyOtp-user", verifyOtpUser);
router.put("/resetPassword-user",resetPasswordUser);


module.exports = router;
