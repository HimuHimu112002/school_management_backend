const {
  SaveAdminService,
  UpdateAdminService,
  GetSingleAdminService,
  adminProfile,
  GetAllWithPaginationAdminService,
  SuperAdminGetAdminProfileService,
} = require("../services/AdminServices");

exports.SaveAdmin = async (req, res) => {
  let result = await SaveAdminService(req);
  return res.status(200).json(result);
};
exports.UpdateAdmin = async (req, res) => {
  let result = await UpdateAdminService(req,res);
  return res.status(200).json(result);
};
exports.SingleAdmin = async (req, res) => {
  let result = await GetSingleAdminService(req);
  return res.status(200).json(result);
};
exports.SinglePersonalAdmin = async (req, res) => {
  let result = await adminProfile(req);
  return res.status(200).json(result);
};
exports.GetAdmin = async (req, res) => {
  let result = await GetAllWithPaginationAdminService(req);
  return res.status(200).json(result);
};
exports.AdminProfile = async (req, res) => {
  let result = await SuperAdminGetAdminProfileService(req);
  return res.status(200).json(result);
};
