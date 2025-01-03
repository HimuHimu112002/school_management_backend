const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  SuperAdmin,
  GetSuperAdmin,
  UpdateSuperAdmin,
} = require("../controller/SuperAdminController");
const UserSignInService = require("../controller/authentication/Login");
const UserForgotPass = require("../controller/authentication/ForgotPass");
const {
  SaveAdmin,
  GetAdmin,
  UpdateAdmin,
  SingleAdmin,
  SinglePersonalAdmin,
  AdminProfile,
} = require("../controller/AdminController");
const TokenDecodAuth = require("../middleware/TokenDecodAuth");
const { adminProfile } = require("../services/AdminServices");
const { EncodeUserToken } = require("../utility/TokenHelper");
const AdminModel = require("../model/AdminModel");
const { SaveTeachers, GetTeacher, SearchByTeacherID } = require("../controller/TeachersController");
const { SaveStudent, GetStudent, GetSearchStudent, GetSearchStudentClassAndVersion, DeleteManyStudent, UpdateManyStudent, GetStudentInvoice } = require("../controller/StudentController");
const {PaymentService, PaymentSuccess, PaymentFail} = require("../controller/payment");


router.post("/sign-in", UserSignInService);
router.post("/forgot", UserForgotPass);
// Authentication api end point end

router.post("/save-super-admin", SuperAdmin);
router.post("/update-super-admin", TokenDecodAuth, UpdateSuperAdmin);
router.get("/get-super-admin", GetSuperAdmin);
// super-admin api end point end

router.post("/save-admin", SaveAdmin);
router.get("/get-admin/:pageNo/:perPage", GetAdmin);
router.post("/update-admin", UpdateAdmin);
router.get("/getSingleAdmin", SingleAdmin);
router.get("/getAdmin", TokenDecodAuth, SinglePersonalAdmin);
router.get("/admin-profile/:id", AdminProfile);
// admin api end point end

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/sign-in",
  }),
  async (req, res) => {
    const user = req.user;
    let admin_id = await AdminModel.findOne({
      AdminEmail: user.email,
    }).select({
      _id: 1,
    });
    // user for create token and get admin _id
    const token = EncodeUserToken(user.email, user._id, admin_id._id);
    const roll = "Admin";
    res.redirect(`http://localhost:5173?token=${token}&roll=${roll}`);
  }
);
// Google OAuth Login end

router.post("/save-teachers", SaveTeachers);
router.get("/get-teacher/:pageNo/:perPage", GetTeacher);
router.get("/search-teacher-id/:id", SearchByTeacherID);
// teachers api end point end


router.post("/save-student", SaveStudent);
//router.post("/save-student",PaymentService);
router.post("/payment/success/:tranId", PaymentSuccess);
router.post("/payment/fail/:tranId", PaymentFail);
router.delete("/deleteManyStudent",DeleteManyStudent);
router.post("/updateManyStudent",UpdateManyStudent);
router.get("/get-student/:pageNo/:perPage", GetStudent);
router.get("/get-invoice/:pageNo/:perPage", GetStudentInvoice);
router.get("/studentSearch/:id/:StudentClass/:StudentClassVersion", GetSearchStudent);
router.get("/studentClassVersionSearch/:StudentClass/:StudentClassVersion", GetSearchStudentClassAndVersion);
// student api end point end



router.post("/payment/init", PaymentService);
// payment getway
module.exports = router;
