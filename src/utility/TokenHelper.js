const jwt = require("jsonwebtoken");
const EncodeUserToken = (email, user_id, admin_id, userRole ) => {
  let KEY = "123-ABC-XYZ";
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = { email: email, user_id: user_id, admin_id: admin_id , userRole:userRole };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};
const DecodeUserToken = (token) => {
  try {
    let KEY = "123-ABC-XYZ";
    return jwt.verify(token, KEY);
  } catch (e) {
    return null;
  }
};
module.exports = { EncodeUserToken, DecodeUserToken };
