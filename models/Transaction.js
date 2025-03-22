const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Transaction_id: {
    type: String,
  },
  frist_name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  Product_id: {
    type: String,
  },
  midtrans_url: {
    type: String,
  },
});

module.exports = mongoose.model("Transctions", userSchema);
