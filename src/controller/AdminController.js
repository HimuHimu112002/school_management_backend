const { SaveAdminService, UpdateAdminService, GetAdminService } = require("../services/AdminServices");

exports.SaveAdmin = async (req, res) => {
    let result = await SaveAdminService(req);
    return res.status(200).json(result);
  };
  exports.UpdateAdmin = async (req, res) => {
    let result = await UpdateAdminService(req);
    return res.status(200).json(result);
  };
  exports.GetAdmin = async (req, res) => {
    let result = await GetAdminService();
    return res.status(200).json(result);
  };