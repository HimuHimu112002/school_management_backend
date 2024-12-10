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
      const findLastFacultyId = async () => {
        const lastFaculty = await TeacherModel.findOne(
          { TeacherRole: "Teacher" },
          {
            id: 1,
            _id: 0,
          }
        )
          .sort({
            createdAt: -1,
          })
          .lean();
        return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
      };
      let currentId = (0).toString();
      const lastFacultyId = await findLastFacultyId();
      if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
      }
      let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
      incrementId = `T-${incrementId}`;
      reqBody.data.id = incrementId;
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

const GetSearchByTeacherID = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await TeacherModel.findOne({ id });
    if (!data) {
      return { status: "fail", message: `Not found this id: - ${id}` };
    }
    return { status: "success", message: "Teacher's find success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
module.exports = {
  SaveTeachersService,
  GetAllTeacherWithPagination,
  GetSearchByTeacherID,
};
