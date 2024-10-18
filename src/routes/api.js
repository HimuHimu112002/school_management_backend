const express = require('express');
const { SuperAdmin } = require('../controller/SuperAdminController');
const router = express.Router();

// super-admin api end point start
router.post("/save-super-admin",SuperAdmin)

module.exports = router