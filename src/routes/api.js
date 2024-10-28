const express = require('express');
const { SuperAdmin, GetSuperAdmin, UpdateSuperAdmin } = require('../controller/SuperAdminController');
const { Login } = require('../controller/authentication/Login');
const UserSignInService = require('../controller/authentication/Login');

const router = express.Router();


// Authentication api end point start
router.post("/sign-in",UserSignInService)
// Authentication api end point end


// super-admin api end point start
router.post("/save-super-admin",SuperAdmin)
router.post("/update-super-admin",UpdateSuperAdmin)
router.get("/get-super-admin",GetSuperAdmin)
// super-admin api end point end

module.exports = router