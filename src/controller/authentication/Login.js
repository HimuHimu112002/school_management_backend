const bcrypt = require("bcrypt");
const UserModel = require("../../model/UserModel");

const UserSignInService = async (req, res) => {
  try {
    let { userEmail, userPassword } = req.body;
    if (!userEmail) {
      res.send({ status: "fail", message: "Please Enter Your Email" });
    } else if (!userPassword) {
      res.send({ status: "fail", message: "Please Enter The Password" });
    } else {
      let EmailExist = await UserModel.find({ userEmail });
      if (EmailExist.length > 0) {
        let user_id = await UserModel.findOne({ userEmail }).select(
          "userStatus"
        );
        if (user_id.userStatus === "unBlock") {
          bcrypt
            .compare(userPassword, EmailExist[0].userPassword)
            .then(function (result) {
              if (result) {
                res.send({ status: "success", message: "Login success" });
              } else {
                res.send({ status: "fail", message: "Password not matching" });
              }
            });
        } else {
          res.send({ status: "fail", message: "user not valid" });
        }
      } else {
        res.send({ status: "fail", message: "Email not matching" });
      }
    }
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong" });
  }
};
module.exports = UserSignInService;
