const phoneValidation = require("../helpers/phoneValidation");
const AdminModel = require("../model/AdminModel");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

const SaveAdminService = async (req) => {
  try {
    let reqBody = req.body;
    let findEmail = await UserModel.find({ userEmail: reqBody.AdminEmail });

    if (!reqBody.AdminEmail) {
      return { status: "fail", message: "Admin data not found" };
    } else if (!phoneValidation(reqBody.AdminPhone)) {
      return { status: "fail", message: "Unvalid bangladeshi phone number" };
    } else if (findEmail.length > 0) {
      return { status: "fail", message: "This email already in used" };
    } else {
      const passHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      // create user======================
      let user = new UserModel({
        userEmail: reqBody.AdminEmail,
        userPassword: passHash,
        userRole: "Admin",
      });
      user.save();

      // create admin===============
      reqBody.user = user._id;
      await AdminModel.create(reqBody);
    }

    return { status: "success", message: "admin Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetAllWithPaginationAdminService = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;

    data = await AdminModel.aggregate([
      {
        $facet: {
          Rows: [
            { $skip: skipRow },
            { $limit: perPage },
            {
              $project: {
                AdminPassword: 0,
              },
            },
          ],
        },
      },
    ]);
    const totalCount = await AdminModel.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    return {
      status: "success",
      message: "Get admin data",
      data: data,
      totalPages,
      totalCount,
      perPage,
    };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const UpdateAdminService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    if (!user_id) {
      return { status: "fail", message: "Update unvalid" };
    }
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
    let user_id = req.headers.id;
    if (!user_id) {
      return { status: "fail", message: "data unvalid" };
    }
    let data = await AdminModel.findById({ _id: user_id });
    return { status: "success", message: "Single admin data Success", data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const adminProfile = async (req) => {
  try {
    let admin_id = req.headers.admin_id;
    if (!admin_id) {
      return { status: "fail", message: "data unvalid" };
    }
    let data = await AdminModel.findById({ _id: admin_id });
    return { status: "success", message: "Single admin data Success tt", data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const SuperAdminGetAdminProfileService = async (req) => {
  try {
    let searchId = await AdminModel.findById({ _id: req.params.id }).select(
      "-AdminPassword"
    );
    if (!searchId) {
      return { status: "fail", message: "data unvalid" };
    }
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
  GetAllWithPaginationAdminService,
  UpdateAdminService,
  SuperAdminGetAdminProfileService,
  GetSingleAdminService,
  adminProfile,
};
