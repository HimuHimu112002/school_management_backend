const { SaveStudentService } = require("../services/StudentService");

exports.SaveStudent = async (req, res) => {
    let result = await SaveStudentService(req);
    return res.status(200).json(result);
  };
  exports.GetStudent = async (req, res) => {
    let result = await GetAllStudentWithPagination(req);
    return res.status(200).json(result);
  };