const express = require('express');
const { SuperAdmin, GetSuperAdmin, UpdateSuperAdmin } = require('../controller/SuperAdminController');
const UserSignInService = require('../controller/authentication/Login');
const UserForgotPass = require('../controller/authentication/ForgotPass');
const { SaveAdmin, GetAdmin, AdminProfile, UpdateAdmin, SingleAdmin } = require('../controller/AdminController');

const router = express.Router();


// Authentication api end point start
router.post("/sign-in",UserSignInService)
router.post("/forgot",UserForgotPass)
// Authentication api end point end


// super-admin api end point start
router.post("/save-super-admin",SuperAdmin)
router.post("/update-super-admin",UpdateSuperAdmin)
router.get("/get-super-admin",GetSuperAdmin)
// super-admin api end point end


// admin api end point start
router.post("/save-admin",SaveAdmin)
router.get("/get-admin/:pageNo/:perPage",GetAdmin)
router.post("/update-admin",UpdateAdmin)
router.get("/getSingleAdmin",SingleAdmin)
router.get("/admin-profile/:id",AdminProfile)
// admin api end point end

module.exports = router