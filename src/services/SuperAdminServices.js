const SuperAdminModel = require("../model/SuperAdminModel");
const bcrypt = require("bcrypt");

const SaveSuperAdminService = async (req) => {
  const count = await SuperAdminModel.countDocuments();
  if (count > 0) {
    return { message: "you don't create more than 1" };
  }
  try {
    let reqBody = req.body;
    await SuperAdminModel.create(reqBody);
    return { status: "success", message: "Super admin Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
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
    let { AdminPassword, ...reqBody } = req.body;
    let updateData = { ...reqBody };
    // console.log(AdminPassword)
    // console.log(updateData)

    if (AdminPassword) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(AdminPassword, saltRounds);
      updateData.AdminPassword = hashedPassword;
    }
    await SuperAdminModel.updateOne(
      { _id: user_id },
      { $set: updateData },
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
