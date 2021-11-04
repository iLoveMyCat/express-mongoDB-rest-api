const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  availability: { type: Boolean, default: true },
  imageURL: { type: String, default: "/images/empty-img.png" },
});

module.exports = mongoose.model("Product", productSchema);
