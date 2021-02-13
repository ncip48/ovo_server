const express = require("express");
const router = express.Router();
const {
  otpOvo,
  checkSaldo,
  checkNotif,
  transferSesama,
  checkOtp,
  checkOvo,
} = require("../controller/ovo");

router.get("/ovo/otp", otpOvo);
router.get("/ovo/auth", checkOtp);
router.post("/ovo/saldo", checkSaldo);
router.get("/ovo/notif", checkNotif);
router.post("/ovo/checkovo", checkOvo);
router.post("/ovo/transfer", transferSesama);

module.exports = router;
