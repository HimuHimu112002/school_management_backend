const {
  SaveSuperAdminService,
  GetSuperAdminService,
  UpdateSuperAdminService,
} = require("../services/SuperAdminServices");

exports.SuperAdmin = async (req, res) => {
  let result = await SaveSuperAdminService(req);
  return res.status(200).json(result);
};
exports.UpdateSuperAdmin = async (req, res) => {
  let result = await UpdateSuperAdminService(req);
  return res.status(200).json(result);
};
exports.GetSuperAdmin = async (req, res) => {
  let result = await GetSuperAdminService();
  return res.status(200).json(result);
};
