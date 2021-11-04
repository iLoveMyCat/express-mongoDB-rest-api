const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  availability: { type: Boolean },
});

module.exports = mongoose.model("Product", productSchema);
