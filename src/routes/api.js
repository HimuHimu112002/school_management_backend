const express = require('express');
const { SuperAdmin, GetSuperAdmin, UpdateSuperAdmin } = require('../controller/SuperAdminController');
const router = express.Router();

// super-admin api end point start
router.post("/save-super-admin",SuperAdmin)
router.post("/update-super-admin",UpdateSuperAdmin)
router.get("/get-super-admin",GetSuperAdmin)

module.exports = router