const { SaveStudentService, GetAllStudentWithPagination, GetSearchByStudent } = require("../services/StudentService");

exports.SaveStudent = async (req, res) => {
  let result = await SaveStudentService(req);
  return res.status(200).json(result);
};
exports.GetStudent = async (req, res) => {
  let result = await GetAllStudentWithPagination(req);
  return res.status(200).json(result);
};
exports.GetSearchStudent = async (req, res) => {
  let result = await GetSearchByStudent(req);
  return res.status(200).json(result);
};
