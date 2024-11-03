const AdminModel = require("../model/AdminModel");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

const SaveAdminService = async (req) => {
  try {
    let reqBody = req.body;
    const passHash = await bcrypt.hash(reqBody.AdminPassword, 10);
    let user = new UserModel({
      userEmail: reqBody.AdminEmail,
      userPassword: passHash,
      userRole: "Admin",
      userStatus: "unBlock",
    });
    user.save();
    reqBody.AdminPassword = passHash;
    reqBody.user = user._id;
    await AdminModel.create(reqBody);
    return { status: "success", message: "admin Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetAdminService = async (req) => {
  try {
    let data = await AdminModel.find({});
    return { status: "success", message: "Get admin data", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const UpdateAdminService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let updateData = req.body;
    await AdminModel.updateOne(
      { _id: user_id },
      { $set: updateData },
      { upsert: true }
    );
    let data = await AdminModel.findOne({ _id: user_id });
    await UserModel.findByIdAndUpdate(
      { _id: data.user },
      { userEmail: data.AdminEmail },
      { upsert: true }
    );
    return { status: "success", message: "Update Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const GetSingleAdminService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let data = await AdminModel.findById({ _id: user_id });
    return { status: "success", message: "Single admin data Success", data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const AdminProfileService = async (req) => {
  try {
    let searchId = await AdminModel.findById({ _id: req.params.id }).select(
      "-AdminPassword"
    );
    return {
      status: "success",
      message: "admin profile success",
      data: searchId,
    };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = {
  SaveAdminService,
  GetAdminService,
  UpdateAdminService,
  AdminProfileService,
  GetSingleAdminService,
};
