const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: String,
  onprescription: Boolean,
  price: Number,
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
