const bcrypt = require("bcrypt");
const UserModel = require("../../model/UserModel");
const {
  EncodeUserToken,
  DecodeUserToken,
} = require("../../utility/TokenHelper");
const AdminModel = require("../../model/AdminModel");
const SuperAdminModel = require("../../model/SuperAdminModel");
const emailVelidation = require("../../helpers/emailValidation");

const UserSignInService = async (req, res) => {
  try {
    let { userEmail, userPassword } = req.body;
    if (!userEmail) {
      res.send({ status: "fail", message: "Please Enter Your Email" });
    }else if (!emailVelidation(userEmail)) {
      res.send({ status: "fail", message: "Please Enter The valid email" });
    }  
    else if (!userPassword) {
      res.send({ status: "fail", message: "Please Enter The Password" });
    } else {
      // find user email
      let EmailExist = await UserModel.find({ userEmail });
      if (!EmailExist) {
        res.send({ status: "fail", message: "data unvalid" });
      }
      if (EmailExist.length > 0) {
        //find user status _id and role for go to create token headers
        let user_status = await UserModel.findOne({ userEmail }).select({
          userStatus: 1,
          _id: 1,
          userRole: 1,
        });
        // find admin info
        let adminInfo = await AdminModel.findOne({ AdminEmail: userEmail });

        //find adminEmail and findOut adminId _id for go to create token headers
        // akhane main admin model er _id find korar jonno
        let admin_id =
          (await AdminModel.findOne({ AdminEmail: userEmail }).select({
            _id: 1,
          })) ||
          (await SuperAdminModel.findOne({ AdminEmail: userEmail }).select({
            _id: 1,
          }));
        // check user status
        if (user_status.userStatus === "unBlock") {
          // User Token Create
          let token = EncodeUserToken(
            userEmail,
            user_status._id.toString(),
            admin_id._id.toString(),
            user_status.userRole
          );
          let role = DecodeUserToken(token);
          bcrypt
            .compare(userPassword, EmailExist[0].userPassword)
            .then(function (result) {
              if (result) {
                res.send({
                  status: "success",
                  message: "Login success",
                  token: token,
                  roll: role.userRole,
                  userInfo: adminInfo,
                });
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
