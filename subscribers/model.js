const mongoose = require("mongoose");

const SubscriberSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscriber", SubscriberSchema);
