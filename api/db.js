const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://adeelimran467:admin1122@cluster0.hfocv.mongodb.net/";
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected");
});
db.on("disconnected", () => {
  console.log("Disconnected");
});
db.on("error", (err) => {
  console.log("Error", err);
});
module.exports = db;
