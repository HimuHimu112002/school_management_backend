const mongoose = require("mongoose");
const DataShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    AdminName: {
      type: String,
    },
    AdminNid: {
      type: String,
    },
    AdminBio: {
      type: String,
    },
    AdminAddress: {
      type: String,
    },
    AdminPhone: {
      type: String,
    },
    AdminEmail: {
      type: String,
    },
    AdminImage: {
      type: String,
    },
    AdminPassword: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const SuperAdminModel = mongoose.model("superAdmin", DataShema);
module.exports = SuperAdminModel;
