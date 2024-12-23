const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    total_amount: { type: String, required: true },
    tran_id: { type: String, required: true },
    currency: { type: String, default: "BDT" },
    student_name: { type: String, required: true },
    student_class: { type: String, required: true },
    student_class_version: { type: String, required: true },
    delivery_status: { type: String, required: true },
    payment_status: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const InvoiceModel = mongoose.model("invoice", DataSchema);
module.exports = InvoiceModel;
