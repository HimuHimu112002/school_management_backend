const mongoose = require("mongoose");
const DataShema = mongoose.Schema(
  {
    TeacherName: {
      type: String,
      required: true,
      required: [true, "Name is required"],
    },
    TeacherNid: {
      type: String,
    },
    TeacherBio: {
      type: String,
    },
    TeacherAddress: {
      type: String,
    },
    TeacherPhone: {
      type: String,
    },
    TeacherSubject: {
      type: String,
    },
    TeacherEmail: {
      type: String,
      required: true,
      required: [true, "Email is required"],
    },
    TeacherImage: {
      type: String,
    },
    TeacherRole: {
      type: String,
      default: "Teacher",
    },
  },
  { timestamps: true, versionKey: false }
);
const TeacherModel = mongoose.model("teacher", DataShema);
module.exports = TeacherModel;
