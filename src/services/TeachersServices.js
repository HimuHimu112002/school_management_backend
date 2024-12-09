const TeacherModel = require("../model/TeachersModel");
const phoneValidation = require("../helpers/phoneValidation");

const SaveTeachersService = async (req) => {
  try {
    let reqBody = req.body;
    let findTeachersDuplicateSubject = await TeacherModel.find({
      TeacherEmail: reqBody.data.TeacherEmail,
      TeacherSubject: reqBody.data.TeacherSubject,
    });
    if (!reqBody.data.TeacherEmail) {
      return { status: "fail", message: "Teacher data not found" };
    } else if (!phoneValidation(reqBody.data.TeacherPhone)) {
      return { status: "fail", message: "Unvalid bangladeshi phone number" };
    } else if (findTeachersDuplicateSubject.length > 0) {
      return { status: "fail", message: "This subject already taken" };
    } else {
      await TeacherModel.create(reqBody.data);
      return { status: "success", message: "teacher save success" };
    }
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetAllTeacherWithPagination = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;

    data = await TeacherModel.aggregate([
      {
        $facet: {
          Rows: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
    const totalCount = await TeacherModel.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    return {
      status: "success",
      message: "Get teacher data",
      data: data,
      totalPages,
      totalCount,
      perPage,
    };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
module.exports = {
  SaveTeachersService,
  GetAllTeacherWithPagination,
};
