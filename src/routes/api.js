const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null,file.fieldname+"-"+uniqueSuffix +`.${file.originalname.split(".")[1]}`);
  },
});
const upload = multer({ storage: storage });

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
  AdminProfile,
  UpdateAdmin,
  SingleAdmin,
  SinglePersonalAdmin,
} = require("../controller/AdminController");
const TokenDecodAuth = require("../middleware/TokenDecodAuth");

// Authentication api end point start
router.post("/sign-in", UserSignInService);
router.post("/forgot", UserForgotPass);
// Authentication api end point end

// super-admin api end point start
router.post("/save-super-admin", SuperAdmin);
router.post("/update-super-admin", UpdateSuperAdmin);
router.get("/get-super-admin", GetSuperAdmin);
// super-admin api end point end


// admin api end point start
router.post("/save-admin", SaveAdmin);
router.get("/get-admin/:pageNo/:perPage", GetAdmin);
//router.post("/update-admin", upload.single("AdminImage"), UpdateAdmin);
router.post("/update-admin", upload.any(), UpdateAdmin);
// jodi akhane upload.single("AdminImage") ata thake tahole image sara update hobe kono value and jodi any use kori thaole image upload na korleo jekno data update kora jabe
router.get("/getSingleAdmin", SingleAdmin);
router.get("/getAdmin", TokenDecodAuth, SinglePersonalAdmin);
router.get("/admin-profile/:id", AdminProfile);
// admin api end point end

module.exports = router;
