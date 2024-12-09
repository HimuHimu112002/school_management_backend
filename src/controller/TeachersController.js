const { SaveTeachersService, GetAllTeacherWithPagination } = require("../services/TeachersServices");
exports.SaveTeachers = async (req, res) => {
  let result = await SaveTeachersService(req);
  return res.status(200).json(result);
};
exports.GetTeacher = async (req, res) => {
  let result = await GetAllTeacherWithPagination(req);
  return res.status(200).json(result);
};
