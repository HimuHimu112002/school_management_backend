const phoneValidation = require("../helpers/phoneValidation");
const StudentModel = require("../model/StudentModel");

const SaveStudentService = async (req) => {
  try {
    let reqBody = req.body;
    if (
      !reqBody.StudentClass &&
      !reqBody.StudentClassVersion &&
      !reqBody.StudentAdmissionFee &&
      !reqBody.StudentName
    ) {
      return { status: "fail", message: "Student data not found" };
    } else if (!phoneValidation(reqBody.StudentPhone)) {
      return { status: "fail", message: "Unvalid bangladeshi phone number" };
    } else {
      const findLastStudent = async (field) => {
        const lastStudent = await StudentModel.findOne(
          {
            StudentClassVersion: reqBody.StudentClassVersion,
          },
          { [field]: 1, _id: 0 }
        )
          .sort({ createdAt: -1 })
          .lean();
        return lastStudent?.[field] || undefined;
      };
      let currentId = (0).toString();
      const lastStudentId = await findLastStudent("id");
      const lastStudentByClass = await findLastStudent("StudentClass");
      const lastStudentByClassVersion = await findLastStudent(
        "StudentClassVersion"
      );
      if (
        lastStudentId &&
        lastStudentByClass === reqBody.StudentClass &&
        lastStudentByClassVersion === reqBody.StudentClassVersion
      ) {
        currentId = lastStudentId.substring(2);
      }
      const incrementId = `S-${(Number(currentId) + 1)
        .toString()
        .padStart(4, "0")}`;
      reqBody.id = incrementId;
      await StudentModel.create(reqBody);
      return { status: "success", message: "Student save success" };
    }
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetAllStudentWithPagination = async (req) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let skipRow = (pageNo - 1) * perPage;
    data = await StudentModel.aggregate([
      {
        $facet: {
          Rows: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
    const totalCount = await StudentModel.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    return {
      status: "success",
      message: "Get all student data",
      data: data,
      totalPages,
      totalCount,
      perPage,
    };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetSearchByStudent = async (req, res) => {
  try {
    const { id, StudentClass, StudentClassVersion } = req.params;
    const matchConditions = {};
    if (id) {
      const ids = id.split(","); // Handle multiple values (comma-separated)
      matchConditions.id = { $in: ids };
    }
    if (StudentClass) {
      const classes = StudentClass.split(",");
      matchConditions.StudentClass = { $in: classes };
    }
    if (StudentClassVersion) {
      const versions = StudentClassVersion.split(",");
      matchConditions.StudentClassVersion = { $in: versions };
    }
    // Aggregation pipeline
    const pipeline = [
      { $match: matchConditions }, // Match stage
    ];
    // Execute aggregation
    const data = await StudentModel.aggregate(pipeline);
    if (!data) {
      return { status: "fail", message: `Not found this` };
    }
    return { status: "success", message: "Student find success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const DeleteManyStudentService = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return { status: "fail", message: "Something Went Wrong !" };
    }
    const data = await StudentModel.deleteMany({ _id: { $in: ids } });
    return { status: "success", message: "Student delete success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const UpdateManyStudentService = async (req, res) => {
  try {
    const reqBody = req.body;
    const bulkOperations = reqBody.data.map((user) => ({
      updateOne: {
        filter: { _id: user.id },
        update: { $set: { id: `S-${user.data}` } },
      },
    }));
    const data = await StudentModel.bulkWrite(bulkOperations);
    return { status: "success", message: "Student update success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const GetSearchByStudentClassAndVersion = async (req, res) => {
  try {
    const { StudentClass, StudentClassVersion } = req.params;
    const matchConditions = {};
    if (StudentClass) {
      const classes = StudentClass.split(",");
      matchConditions.StudentClass = { $in: classes };
    }
    if (StudentClassVersion) {
      const versions = StudentClassVersion.split(",");
      matchConditions.StudentClassVersion = { $in: versions };
    }
    // Aggregation pipeline
    const pipeline = [
      { $match: matchConditions }, // Match stage
    ];
    // Execute aggregation
    const data = await StudentModel.aggregate(pipeline);
    if (!data) {
      return { status: "fail", message: `Not found this` };
    }
    return { status: "success", message: "Student find success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

module.exports = {
  SaveStudentService,
  GetAllStudentWithPagination,
  GetSearchByStudent,
  GetSearchByStudentClassAndVersion,
  DeleteManyStudentService,
  UpdateManyStudentService,
};
