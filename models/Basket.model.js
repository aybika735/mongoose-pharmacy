const mongoose = require("mongoose");

const basketSchema = mongoose.Schema({
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Client",
  },
  shop: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Medicine",
    },
  ],
  totalprice: {
    type: Number,
    default: 0,
  },
  card: {
    type: Number,
    default: 0,
  },
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
