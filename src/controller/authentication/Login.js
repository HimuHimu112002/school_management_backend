const bcrypt = require("bcrypt");
const SuperAdminModel = require("../../model/SuperAdminModel");
const UserSignInService = async (req, res) => {
  try {
    let { AdminEmail, AdminPassword } = req.body;
    if (!AdminEmail) {
      res.send({ status: "fail", message: "Please Enter Your Email" });
    } else if (!AdminPassword) {
      res.send({ status: "fail", message: "Please Enter The Password" });
    } else {
      let EmailExist = await SuperAdminModel.find({ AdminEmail });
      if (EmailExist.length > 0) {
        bcrypt
          .compare(AdminPassword, EmailExist[0].AdminPassword)
          .then(function (result) {
            if (result) {
              res.send({ status: "success", message: "Login success" });
            } else {
              res.send({ status: "fail", message: "Password not matching" });
            }
          });
      } else {
        res.send({ status: "fail", message: "Email not matching" });
      }
    }
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong" });
  }
};
module.exports = UserSignInService;
