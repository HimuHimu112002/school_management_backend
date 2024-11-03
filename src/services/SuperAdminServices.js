const SuperAdminModel = require("../model/SuperAdminModel");
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");

const SaveSuperAdminService = async (req) => {
  const count = await SuperAdminModel.countDocuments();
  if (count > 0) {
    return { message: "you don't create more than 1" };
  }
  try {
    let reqBody = req.body;
    const passHash = await bcrypt.hash(reqBody.AdminPassword, 10);
    let user = new UserModel({
      userEmail: reqBody.AdminEmail,
      userPassword: passHash,
      userRole: "Super-Admin",
    });
    user.save();
    reqBody.AdminPassword = passHash;
    reqBody.user = user._id;
    await SuperAdminModel.create(reqBody);
    return { status: "success", message: "Super admin Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

const GetSuperAdminService = async (req) => {
  try {
    let data = await SuperAdminModel.find({});
    return { status: "success", message: "Get super admin", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const UpdateSuperAdminService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let updateData = req.body
    await SuperAdminModel.updateOne(
      { _id: user_id },
      { $set: updateData },
      { upsert: true }
    );
    let data = await SuperAdminModel.findOne({ _id: user_id });
    await UserModel.findByIdAndUpdate(
      { _id: data.user },
      { userEmail: data.AdminEmail },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = {
  SaveSuperAdminService,
  GetSuperAdminService,
  UpdateSuperAdminService,
};
