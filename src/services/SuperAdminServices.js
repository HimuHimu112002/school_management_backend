const SuperAdminModel = require("../model/SuperAdminModel");

const SaveSuperAdminService = async (req) => {
  const count = await SuperAdminModel.countDocuments();
  if (count > 0) {
    return {message: "you don't create more than 1" };
  }
  try {
    let reqBody = req.body;
    await SuperAdminModel.create(reqBody);
    return { status: "success", message: "Super admin Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
module.exports = {
  SaveSuperAdminService,
};
