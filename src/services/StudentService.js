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
          { StudentRole: "Student" },
          { [field]: 1, _id: 0 }
        )
          .sort({ createdAt: -1 })
          .lean();
        return lastStudent?.[field] || undefined;
      };
      let currentId = (0).toString();
      const lastStudentId = await findLastStudent("id");
      const lastStudentByClass = await findLastStudent("StudentClass");
      if (lastStudentId && lastStudentByClass === reqBody.StudentClass) {
        currentId = lastStudentId.substring(2);
      }
      const incrementId = `S-${(Number(currentId) + 1).toString().padStart(4, "0")}`;
      reqBody.id = incrementId;
      await StudentModel.create(reqBody);
      return { status: "success", message: "Student save success" };
    }
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
module.exports = {
  SaveStudentService,
};
