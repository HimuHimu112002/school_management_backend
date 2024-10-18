const mongoose = require("mongoose");
function DatabaseConnection() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connecting.....!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}
module.exports = DatabaseConnection;
