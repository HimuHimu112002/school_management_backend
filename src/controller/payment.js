const SSLCommerzPayment = require("sslcommerz-lts");
const InvoiceModel = require("../model/InvoiceModel");
const is_live = false;
const tran_id = Math.floor(100000000 + Math.random() * 900000000);

const PaymentService = async (req, res) => {
  let reqBody = req.body;
  const data = {
    total_amount: reqBody?.StudentAdmissionFee,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `http://localhost:4000/api/v1/payment/success/${tran_id}`,
    fail_url: `http://localhost:4000/api/v1/payment/fail/${tran_id}`,
    cancel_url: "http://localhost:5000/api/payment/cancel",
    ipn_url: "http://localhost:5000/api/payment/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslCommerz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    is_live
  );
  sslCommerz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
  });
  // =============Step 04: Create Invoice=====================================

  let delivery_status = "pending";
  let payment_status = "pending";

  let createInvoice = await InvoiceModel({
    total_amount: reqBody?.StudentAdmissionFee,
    tran_id: tran_id,
    student_name: reqBody?.StudentName,
    student_class: reqBody?.StudentClass,
    student_class_version: reqBody?.StudentClassVersion,
    delivery_status: delivery_status,
    payment_status: payment_status,
  });
  createInvoice.save();
};

const PaymentSuccess = async (req, res) => {
  try {
    let tranId = req.params.tranId;
    const result = await InvoiceModel.updateOne(
      { tran_id: tranId },
      { payment_status: "success" }
    );
    if (result.modifiedCount > 0) {
      res.redirect("http://localhost:5173/invoice");
    } else {
      res.redirect("http://localhost:5173");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const PaymentFail = async (req, res) => {
  try {
    let tranId =  req.params.tranId;
    const result = await InvoiceModel.updateOne(
      { tran_id: tranId },
      { payment_status: "fail" }
    );
    if (result.modifiedCount > 0) {
      res.redirect("http://localhost:5173/invoice");
    } else {
      res.redirect("http://localhost:5173");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { PaymentService, PaymentSuccess,PaymentFail };
