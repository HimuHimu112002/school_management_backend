const mongoose = require("mongoose");
const DataShema = mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    StudentName: {
      type: String,
      required: true,
      required: [true, "Name is required"],
    },
    StudentFatherName: {
      type: String,
    },
    StudentMotherName: {
      type: String,
    },
    StudentAddress: {
      type: String,
    },
    StudentPhone: {
      type: String,
    },
    StudentClassVersion: {
      type: String,
    },
    StudentClass: {
      type: String,
      required: true,
      required: [true, "Name is required"],
    },
    StudentAdmissionFee: {
      type: String,
      required: true,
      required: [true, "Name is required"],
    },
    StudentRole: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true, versionKey: false }
);
const StudentModel = mongoose.model("student", DataShema);
module.exports = StudentModel;
