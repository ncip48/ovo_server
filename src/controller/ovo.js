const OVOID = require("ovoid");
let ovoid = new OVOID();

exports.otpOvo = async (req, res) => {
  const { phone } = req.body;
  try {
    let refId = await ovoid.login2FA(phone);
    res.send({
      result: refId,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

exports.checkOtp = async (req, res) => {
  const { phone, refId, otp, pin } = req.body;
  try {
    let accessToken = await ovoid.login2FAVerify(refId, otp, phone);
    let authToken = await ovoid.loginSecurityCode(
      pin,
      accessToken.updateAccessToken
    );
    res.send({
      token: authToken.token,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

exports.checkSaldo = async (req, res) => {
  const { token } = req.body;
  try {
    ovoid = new OVOID(token);
    let balanceCash = await ovoid.getBalance("cash");
    res.send({
      balance: balanceCash,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

exports.checkNotif = async (req, res) => {
  const { token } = req.body;
  try {
    ovoid = new OVOID(token);
    let notif = await ovoid.getAllNotification();
    res.send({
      notif,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

exports.checkOvo = async (req, res) => {
  const { token, nominal, tujuan } = req.body;
  try {
    ovoid = new OVOID(token);
    let isOVO = await ovoid.isOVO(nominal, tujuan);
    res.send({
      isOVO,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

exports.transferSesama = async (req, res) => {
  const { token, nominal, tujuan, catatan } = req.body;
  try {
    ovoid = new OVOID(token);
    let transferOvo = await ovoid.transferOvo(tujuan, nominal, catatan);
    res.send({
      transferOvo,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};
