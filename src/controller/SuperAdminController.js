const { SaveSuperAdminService } = require("../services/SuperAdminServices");

exports.SuperAdmin = async (req, res) => {
  let result = await SaveSuperAdminService(req);
  return res.status(200).json(result);
};
