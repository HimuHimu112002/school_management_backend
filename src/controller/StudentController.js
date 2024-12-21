const { SaveStudentService, GetAllStudentWithPagination, GetSearchByStudent, GetSearchByStudentClassAndVersion, DeleteManyStudentService } = require("../services/StudentService");

exports.SaveStudent = async (req, res) => {
  let result = await SaveStudentService(req);
  return res.status(200).json(result);
};
exports.DeleteManyStudent = async (req, res) => {
  let result = await DeleteManyStudentService(req);
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
exports.GetSearchStudentClassAndVersion = async (req, res) => {
  let result = await GetSearchByStudentClassAndVersion(req);
  return res.status(200).json(result);
};
