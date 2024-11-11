const { DecodeUserToken } = require("../utility/TokenHelper");

const auth = async (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
    }
  }
  let decoded = DecodeUserToken(token);
  if (decoded === null) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  } else {
    let email = decoded["email"];
    let user_id = decoded["user_id"];
    let admin_id = decoded["admin_id"];
    req.headers.email = email;
    req.headers.user_id = user_id;
    req.headers.admin_id = admin_id;
    next();
  }
};
module.exports = auth;
