const bcrypt = require("bcrypt");
const emailVelidation = require("../../helpers/emailValidation");
const UserModel = require("../../model/UserModel");
const UserForgotPass = async (req, res) => {
  try {
    let { userEmail, userPassword } = req.body;
    if (!userEmail) {
      res.send({ status: "fail", message: "Please Enter Your Email" });
    } else if (!emailVelidation(userEmail)) {
      res.send({ status: "fail", message: "Please Enter Your valid Email" });
    } else if (!userPassword) {
      res.send({ status: "fail", message: "Please Enter The Password" });
    } else {
      let EmailExist = await UserModel.find({ userEmail });
      if (EmailExist.length > 0) {
        bcrypt.hash(userPassword, 10, async function (err, hash) {
          await UserModel.findOneAndUpdate(
            { userEmail },
            { userPassword: hash }
          );
          res.send({
            status: "success",
            message: "Password change successfull",
          });
        });
      } else {
        res.send({ status: "fail", message: "Email not matching" });
      }
    }
  } catch (e) {
    res.send({ status: "fail", message: "Something Went Wrong" });
  }
};
module.exports = UserForgotPass;
