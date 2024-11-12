const {
  SaveAdminService,
  UpdateAdminService,
  GetAdminService,
  AdminProfileService,
  GetSingleAdminService,
  GetSingleAdmin,
} = require("../services/AdminServices");

exports.SaveAdmin = async (req, res) => {
  let result = await SaveAdminService(req);
  return res.status(200).json(result);
};
exports.UpdateAdmin = async (req, res) => {
  let result = await UpdateAdminService(req);
  return res.status(200).json(result);
};
exports.SingleAdmin = async (req, res) => {
  let result = await GetSingleAdminService(req);
  return res.status(200).json(result);
};
exports.SinglePersonalAdmin = async (req, res) => {
  let result = await GetSingleAdmin(req);
  return res.status(200).json(result);
};
exports.GetAdmin = async (req, res) => {
  let result = await GetAdminService(req);
  return res.status(200).json(result);
};
exports.AdminProfile = async (req, res) => {
  let result = await AdminProfileService(req);
  return res.status(200).json(result);
};
